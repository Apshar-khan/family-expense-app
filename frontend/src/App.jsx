import React, { useState } from 'react';
import AddExpense from './AddExpense';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Function to add a new expense
  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  // Calculate the running total automatically
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Family Expense Tracker</h1>
      
      {/* Input Form Component */}
      <AddExpense onAddExpense={handleAddExpense} />

      {/* Total Amount Display Box */}
      <div style={{ 
        background: '#e9f7ef', 
        border: '1px solid #d4edda', 
        padding: '15px', 
        borderRadius: '8px', 
        textAlign: 'center', 
        marginTop: '20px' 
      }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#155724' }}>Total House Expenses</h3>
        <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
          ₹ {totalAmount.toFixed(2)}
        </p>
      </div>

      {/* List of Recent Expenses */}
      <div style={{ marginTop: '25px' }}>
        <h3 style={{ color: '#333' }}>Expense History</h3>
        {expenses.length === 0 ? (
          <p style={{ color: '#777', fontStyle: 'italic', textAlign: 'center' }}>No expenses added yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {expenses.map((item) => (
              <li key={item.id} style={{ 
                background: '#ffffff', 
                padding: '12px 15px', 
                marginBottom: '10px', 
                borderRadius: '6px',
                borderLeft: '4px solid #007bff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ fontSize: '16px', color: '#333' }}>{item.category}</strong>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                    Paid by: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{item.paidBy}</span> | {item.description || 'No description'} 
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{item.date}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  ₹ {item.amount}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;