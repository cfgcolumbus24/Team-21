from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client, Client
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import os

# Initialize FastAPI app
app = FastAPI()

# Load environment variables and connect to Supabase
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Function to fetch data from Supabase
def fetch_data(query: str) -> pd.DataFrame:
    result = supabase.rpc("exec_sql", {"sql_query": query}).execute()
    return pd.DataFrame(result.data) if result.data else pd.DataFrame()

# Anomaly detection function
def detect_anomalies():
    # Fetch data from Supabase
    revenue_df = fetch_data("SELECT * FROM Revenue")
    expenses_df = fetch_data("SELECT * FROM Expenses")

    # Preprocess data
    for df in [revenue_df, expenses_df]:
        df['date'] = pd.to_datetime(df['date'])
        df['timestamp'] = df['date'].astype('int64') // 10**9  # Convert date to UNIX timestamp in seconds

    # Run anomaly detection for Revenue
    revenue_features = revenue_df[['amount', 'timestamp']]
    scaler_revenue = StandardScaler()
    revenue_features_scaled = scaler_revenue.fit_transform(revenue_features)
    isolation_forest_low = IsolationForest(contamination=0.01, random_state=42)
    revenue_df['anomaly'] = isolation_forest_low.fit_predict(revenue_features_scaled)
    revenue_anomalies = revenue_df[(revenue_df['anomaly'] == -1) & (revenue_df['amount'] < revenue_df['amount'].median())]

    # Run anomaly detection for Expenses
    expenses_features = expenses_df[['amount', 'timestamp']]
    scaler_expenses = StandardScaler()
    expenses_features_scaled = scaler_expenses.fit_transform(expenses_features)
    isolation_forest_high = IsolationForest(contamination=0.01, random_state=42)
    expenses_df['anomaly'] = isolation_forest_high.fit_predict(expenses_features_scaled)
    expenses_anomalies = expenses_df[(expenses_df['anomaly'] == -1) & (expenses_df['amount'] > expenses_df['amount'].median())]

    # Return anomalies as JSON
    return {
        "revenue_anomalies": revenue_anomalies[['id', 'date', 'amount']].to_dict(orient="records"),
        "expenses_anomalies": expenses_anomalies[['id', 'date', 'amount']].to_dict(orient="records")
    }

# Endpoint to get anomalies
@app.get("/detect_anomalies")
def get_anomalies():
    anomalies = detect_anomalies()
    return anomalies

# To run the server: 
# uvicorn anomaly_detection:app --reload --port 8001
