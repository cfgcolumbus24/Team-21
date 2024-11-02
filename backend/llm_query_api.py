import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from supabase import create_client, Client
from fastapi import Query

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize FastAPI and Supabase client
app = FastAPI()
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define the input model for API
class QueryRequest(BaseModel):
    user_query: str

# Helper function to generate SQL query using LLM
def generate_sql_query(user_query: str) -> str:
    prompt = f"""
    Convert the following natural language query into an SQL string:
    Query: "{user_query}"
    Database structure:
    Table 1 - patient: Columns (patient_id: int4, name: varchar, age: int4, length_of_stay: int4, gender: text, transgender_identity: text, sexual_orientation: text, race_or_ethnicity: text)
    
    SQL Query string:
    """
    
    # Update for chat-based interaction with gpt-3.5-turbo
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an SQL expert."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0
    )
    
    sql_query = response.choices[0].message['content'].strip()
    return sql_query

# API Endpoint
@app.get("/query")  # Ensure we're using GET here
async def query_database(user_query: str = Query(..., description="User's search query"),):
    # Debugging line to confirm received query
    print(f"Received user query: {user_query}")
    
    # Step 1: Generate SQL query
    try:
        sql_query = generate_sql_query(user_query)
        print(f"Generated SQL Query: {sql_query}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating SQL query: {e}")

    # Step 2: Query Supabase database
    try:
        result = supabase.rpc("exec_sql", {"sql_query": str(sql_query)}).execute()
        if result.error:
            raise Exception(result.error)
        return {"data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {e}")

# To run: `uvicorn script_name:app --reload`
