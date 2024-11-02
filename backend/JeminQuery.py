import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from supabase import create_client, Client
from fastapi import Query
from datetime import date

# Load environment variables
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize FastAPI and Supabase client
app = FastAPI()
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define the start of the current year
current_year_start = date.today().replace(month=1, day=1).isoformat()

try:
    # Query for unique patient_id counts from this year
    response = supabase.table('intakes').select('patient_id', count='exact').gte('last_intake_date', current_year_start).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of clients year-to-date: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")



try:
    #get total number of intakes
    response = supabase.table('intakes').select('patient_id', count='exact').execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of intakes: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")


try:
    #intakes with readmission in 72 hours
    response = supabase.table('intakes').select('patient_id', count='exact').gte('readmission_within_72', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of readmission in 72: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")


try:
    #intakes with readmission in 30 days
    response = supabase.table('intakes').select('patient_id', count='exact').gte('readmission_within_30', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of readmission within 30: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")

try:
    #number of discharges total
    response = supabase.table('discharges').select('patient_id', count='exact').execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of total discharges: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")


try:
    #number of discharges to hospital
    response = supabase.table('discharges').select('patient_id', count='exact').gte('hospital', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of discharges to hospitals: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")


try:
    #number of discharges to higher not hospital
    response = supabase.table('discharges').select('patient_id', count='exact').eq('hospital', 0).gte('higher_level', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of discharges to higher not hospital: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")

try:
    #number of discharges to home
    response = supabase.table('discharges').select('patient_id', count='exact').eq('home_community', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of discharges home: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")

try:
    #number of discharges undersirable
    response = supabase.table('discharges').select('patient_id', count='exact').eq('undesirable_circumstances', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of undersirable discharges: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")

try:
    #number of unknown undersirable
    response = supabase.table('discharges').select('patient_id', count='exact').eq('unknown', 1).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of unknown discharges: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")



# Endpoint to fetch discharge data by gender
class ageGroup(BaseModel):
    age_group: str
    hospital_count: int
    higher_level_count: int
    undesirable_count: int
    home_count: int

@app.get("/ageGroup", response_model=list[ageGroup])
async def get_ageGroup_discharge():
    try:
        sql_query = """
      WITH
  age_groups AS (
    SELECT
      UNNEST(
        ARRAY[
          '0-4',
          '5-9',
          '10-13',
          '14-17',
          '18-24',
          '25-34',
          '35-44',
          '45-54',
          '55-64',
          '65-74',
          '75-84',
          '85+',
          'Age unknown'
        ]
      ) AS age_group
  ),
  age_group_counts AS (
    SELECT
      CASE
        WHEN patient.age BETWEEN 0 AND 4  THEN '0-4'
        WHEN patient.age BETWEEN 5 AND 9  THEN '5-9'
        WHEN patient.age BETWEEN 10 AND 13  THEN '10-13'
        WHEN patient.age BETWEEN 14 AND 17  THEN '14-17'
        WHEN patient.age BETWEEN 18 AND 24  THEN '18-24'
        WHEN patient.age BETWEEN 25 AND 34  THEN '25-34'
        WHEN patient.age BETWEEN 35 AND 44  THEN '35-44'
        WHEN patient.age BETWEEN 45 AND 54  THEN '45-54'
        WHEN patient.age BETWEEN 55 AND 64  THEN '55-64'
        WHEN patient.age BETWEEN 65 AND 74  THEN '65-74'
        WHEN patient.age BETWEEN 75 AND 84  THEN '75-84'
        WHEN patient.age >= 85 THEN '85+'
        ELSE 'Age unknown'
      END AS age_group,
      COUNT(
        CASE
          WHEN discharges.last_service_used = 'hospital' THEN 1
        END
      ) AS hospital_count,
      COUNT(
        CASE
          WHEN discharges.last_service_used = 'higher level' THEN 1
        END
      ) AS higher_level_count,
      COUNT(
        CASE
          WHEN discharges.last_service_used = 'undesirable circumstances' THEN 1
        END
      ) AS undesirable_count,
      COUNT(
        CASE
          WHEN discharges.last_service_used = 'home community' THEN 1
        END
      ) AS home_count
    FROM
      patient
      LEFT JOIN discharges ON discharges.patient_id = patient.patient_id
    GROUP BY
      age_group
  )
SELECT
  age_groups.age_group,
  COALESCE(SUM(age_group_counts.hospital_count), 0) AS hospital_count,
  COALESCE(SUM(age_group_counts.higher_level_count), 0) AS higher_level_count,
  COALESCE(SUM(age_group_counts.undesirable_count), 0) AS undesirable_count,
  COALESCE(SUM(age_group_counts.home_count), 0) AS home_count
FROM
  age_groups
  LEFT JOIN age_group_counts ON age_groups.age_group = age_group_counts.age_group
GROUP BY
  age_groups.age_group
ORDER BY
  CASE
    WHEN age_groups.age_group = '0-4' THEN 1
    WHEN age_groups.age_group = '5-9' THEN 2
    WHEN age_groups.age_group = '10-13' THEN 3
    WHEN age_groups.age_group = '14-17' THEN 4
    WHEN age_groups.age_group = '18-24' THEN 5
    WHEN age_groups.age_group = '25-34' THEN 6
    WHEN age_groups.age_group = '35-44' THEN 7
    WHEN age_groups.age_group = '45-54' THEN 8
    WHEN age_groups.age_group = '55-64' THEN 9
    WHEN age_groups.age_group = '65-74' THEN 10
    WHEN age_groups.age_group = '75-84' THEN 11
    WHEN age_groups.age_group = '85+' THEN 12
    WHEN age_groups.age_group = 'Age unknown' THEN 13
  END
        """
        
        response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()
        return response.data
    



    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    