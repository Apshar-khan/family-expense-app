from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect("expenses.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            paid_by TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

class Expense(BaseModel):
    amount: float
    category: str
    paid_by: str
    description: str = ""
    date: str

@app.get("/expenses")
def get_expenses():
    conn = sqlite3.connect("expenses.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/expenses")
def add_expense(expense: Expense):
    conn = sqlite3.connect("expenses.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO expenses (amount, category, paid_by, description, date)
        VALUES (?, ?, ?, ?, ?)
    """, (expense.amount, expense.category, expense.paid_by, expense.description, expense.date))
    conn.commit()
    conn.close()
    return {"message": "Expense added successfully!"}