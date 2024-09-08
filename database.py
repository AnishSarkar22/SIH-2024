import psycopg2
from psycopg2 import sql

DB_HOST = "guideme.c9ukm6acs5l1.ap-south-1.rds.amazonaws.com"
DB_NAME = "users"
DB_USER = "guideme_master"
DB_PASS = "89*Qi9%Y#5q5oySq&6"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
cur = conn.cursor()

try:
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL CHECK (role IN ('mentor', 'mentee'))
        );
    """)
    conn.commit()
    print("Table created successfully")
except Exception as e:
    print("An error occurred:", e)
finally:
    cur.close()
    conn.close()
