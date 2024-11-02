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
    output_type: str

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
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an SQL expert."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0
    )
    
    sql_query = response.choices[0].message['content'].strip()
    return sql_query

def generate_text_output(user_query: str, sql_query: str, data) -> str:
    prompt = f"""
    Using the raw data below, answer the following question with its returned data below:
    Question: "{user_query}"
    Sql_query: "{sql_query}"
    Data: "{data}"
    
    Text Summary:
    """
    
    # Update for chat-based interaction with gpt-3.5-turbo
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0
    )
    
    output = response.choices[0].message['content'].strip()
    return output

def generate_graph_output(user_query: str, data) -> str:
    return


# API Endpoint
@app.post("/query")  # Changed to POST here
async def query_database(request: QueryRequest):
    # Debugging line to confirm received query
    print(f"Received user query: {request.user_query}")
    print(f"Requested output type: {request.output_type}")
    
    # Step 1: Generate SQL query
    try:
        sql_query = generate_sql_query(request.user_query)
        print(f"Generated SQL Query: {sql_query}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating SQL query: {e}")

    # Step 2: Query Supabase database
    try:
        result = supabase.rpc("exec_sql", {'sql_query': sql_query}).execute()
        
        # Choose the output type based on user's request
        if request.output_type == "text":
            return generate_text_output(request.user_query, sql_query, result.data)
        elif request.output_type == "table":
            return result.data
        elif request.output_type == "graph":
            print(result.data)
            return generate_graph_output(request.user_query, result.data)
        else:
            raise HTTPException(status_code=400, detail="Invalid output type specified")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {e}")

# To run: `uvicorn llm_query_api:app --reload`

# {
#     "user_query": "Get all patients above age 40",
#     "output_type": "text"
# }

