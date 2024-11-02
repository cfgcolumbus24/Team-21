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

# # Define the start of the current year
# current_year_start = date.today().replace(month=1, day=1).isoformat()

# try:
#     # Query for unique patient_id counts from this year
#     response = supabase.table('intakes').select('patient_id', count='exact').gte('last_intake_date', current_year_start).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of clients year-to-date: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")



# try:
#     #get total number of intakes
#     response = supabase.table('intakes').select('patient_id', count='exact').execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of intakes: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")


# try:
#     #intakes with readmission in 72 hours
#     response = supabase.table('intakes').select('patient_id', count='exact').gte('readmission_within_72', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of readmission in 72: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")


# try:
#     #intakes with readmission in 30 days
#     response = supabase.table('intakes').select('patient_id', count='exact').gte('readmission_within_30', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of readmission within 30: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")

# try:
#     #number of discharges total
#     response = supabase.table('discharges').select('patient_id', count='exact').execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of total discharges: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")


# try:
#     #number of discharges to hospital
#     response = supabase.table('discharges').select('patient_id', count='exact').gte('hospital', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of discharges to hospitals: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")


# try:
#     #number of discharges to higher not hospital
#     response = supabase.table('discharges').select('patient_id', count='exact').eq('hospital', 0).gte('higher_level', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of discharges to higher not hospital: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")

# try:
#     #number of discharges to home
#     response = supabase.table('discharges').select('patient_id', count='exact').eq('home_community', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of discharges home: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")

# try:
#     #number of discharges undersirable
#     response = supabase.table('discharges').select('patient_id', count='exact').eq('undesirable_circumstances', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of undersirable discharges: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")

# try:
#     #number of unknown undersirable
#     response = supabase.table('discharges').select('patient_id', count='exact').eq('unknown', 1).execute()

#     # If data is returned, count is present in response
#     if response.data:
#         client_count_ytd = response.count  # Total unique patient count
#         print(f"Number of unknown discharges: {client_count_ytd}")
#     else:
#         print("No data found or query returned an empty result.")

# except Exception as e:
#     print(f"An error occurred: {e}")


try:
    #discharge by age 0-4
    # Query to join tables on age
    sql_query = "SELECT discharges.patient_id, discharges.higher_level, discharges.hospital, patients.name, patients.age, patients.other_info  FROM discharges JOIN patients ON discharges.patient_id = patients.id WHERE  Patient.age >= 0 AND Patient.age <= 1000;"
    response = supabase.rpc("exec_sql", {"sql_query": sql_query}).execute()

    # If data is returned, count is present in response
    if response.data:
        client_count_ytd = response.count  # Total unique patient count
        print(f"Number of 0-1000 patients: {client_count_ytd}")
    else:
        print("No data found or query returned an empty result.")

except Exception as e:
    print(f"An error occurred: {e}")



