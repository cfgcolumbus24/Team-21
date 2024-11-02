from typing import List
from pydantic import BaseModel
from supabase import create_client, Client
from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase URL and Key must be set in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# Define a model for the average length of stay response
class AverageLengthOfStayResponse(BaseModel):
    average_length_of_stay: float

# Endpoint to fetch average length of stay data
@app.get("/average_length_of_stay", response_model=AverageLengthOfStayResponse)
async def get_average_length_of_stay():
    try:
        # Query to fetch average length of stay from 'patient' table
        sql_query = "SELECT AVG(length_of_stay) AS average_length_of_stay FROM public.patient;"
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

        # Check if data exists
        if not response.data or "average_length_of_stay" not in response.data[0]:
            raise HTTPException(status_code=404, detail="No data found in 'patient' table")
        
        # Return response data in expected model format
        return AverageLengthOfStayResponse(average_length_of_stay=response.data[0]["average_length_of_stay"])

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to fetch discharge data by gender
class GenderDischarge(BaseModel):
    gender: str
    discharge_count: int
    total_higher_level: int
    total_home_community: int
    total_hospital: int
    total_undesirable_circumstances: int
    total: int

@app.get("/gender_discharge", response_model=List[GenderDischarge])
async def get_gender_discharge():
    try:
        sql_query = """
        SELECT
          COALESCE(p.gender, 'total') AS gender,
          COUNT(d.patient_id) AS discharge_count,
          SUM(d.higher_level) AS total_higher_level,
          SUM(d.home_community) AS total_home_community,
          SUM(d.hospital) AS total_hospital,
          SUM(d.undesirable_circumstances) AS total_undesirable_circumstances,
          COUNT(d.patient_id) AS total
        FROM
          public.patient p
          JOIN public.discharges d ON p.patient_id = d.patient_id
        GROUP BY
          ROLLUP (p.gender)
        ORDER BY
          p.gender
        """
        
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

        return response.data
    



    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class TransgenderDischarge(BaseModel):
    transgender_identity: str
    discharge_count: int
    total_higher_level: int
    total_home_community: int
    total_hospital: int
    total_undesirable_circumstances: int

@app.get("/transgender_discharge", response_model=List[TransgenderDischarge])
async def get_Transgender_discharge():

      try:
        sql_query = """
       SELECT
            COALESCE(p.transgender_identity, 'total') AS transgender_identity,
            COUNT(d.patient_id) AS discharge_count,
            SUM(d.higher_level) AS total_higher_level,
            SUM(d.home_community) AS total_home_community,
            SUM(d.hospital) AS total_hospital,
            SUM(d.undesirable_circumstances) AS total_undesirable_circumstances
      FROM
            public.patient p
      JOIN public.discharges d ON p.patient_id = d.patient_id
      GROUP BY
            ROLLUP (p.transgender_identity)
      ORDER BY
            p.transgender_identity
        """
        
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

        return response.data
    



      except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
      

class Sexual_Orienatation_Discharge(BaseModel):
    sexual_orientation: str
    discharge_count: int
    total_higher_level: int
    total_home_community: int
    total_hospital: int
    total_undesirable_circumstances: int

@app.get("/sexual_orientation_discharge", response_model=List[Sexual_Orienatation_Discharge])
async def get_sexual_orientation_discharge():

      try:
        sql_query = """
      SELECT
            COALESCE(p.sexual_orientation, 'total') AS sexual_orientation,
            COUNT(d.patient_id) AS discharge_count,
            SUM(d.higher_level) AS total_higher_level,
            SUM(d.home_community) AS total_home_community,
            SUM(d.hospital) AS total_hospital,
            SUM(d.undesirable_circumstances) AS total_undesirable_circumstances
      FROM
            public.patient p
      JOIN public.discharges d ON p.patient_id = d.patient_id
      GROUP BY
            ROLLUP (p.sexual_orientation)
      ORDER BY
            p.sexual_orientation
        """
        
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

        return response.data
    



      except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
      

class Race_Ethnicity_Discharge(BaseModel):
    race_or_ethnicity: str
    discharge_count: int
    total_higher_level: int
    total_home_community: int
    total_hospital: int
    total_undesirable_circumstances: int

@app.get("/race_ethnicity_discharge", response_model=List[Race_Ethnicity_Discharge])
async def get_race_ethnicity_discharge():

      try:
        sql_query = """
SELECT
      COALESCE(p.race_or_ethnicity, 'total') AS race_or_ethnicity,
      COUNT(d.patient_id) AS discharge_count,
      SUM(d.higher_level) AS total_higher_level,
      SUM(d.home_community) AS total_home_community,
      SUM(d.hospital) AS total_hospital,
      SUM(d.undesirable_circumstances) AS total_undesirable_circumstances
    FROM
  public.patient p
  JOIN public.discharges d ON p.patient_id = d.patient_id
GROUP BY
  ROLLUP (p.race_or_ethnicity)
ORDER BY
  p.race_or_ethnicity
        """
        
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

        return response.data
    



      except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
      
      


      

