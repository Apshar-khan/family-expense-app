import React, { useState } from 'react';
import './AddExpense.css';

function AddExpense({ onAddExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [paidBy, setPaidBy] = useState('Patan');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      paidBy,
      description,
      date: new Date().toLocaleDateString()
    };

    onAddExpense(newExpense);
    
    // Clear form fields
    setAmount('');
    setDescription('');
  };

  return (
    <div className="expense-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <h3>Add House Expense</h3>
        
        <div className="form-group">
          <label>Amount (₹)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="e.g., 450" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Paid By</label>
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            <option value="Apshar">Patan</option>
            <option value="Member 2">Thahaseen</option>
            <option value="Member 3">Farzana</option>
            <option value="Member 4">Gafoor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Groceries">Groceries</option>
            <option value="Utilities & Bills">Utilities & Bills</option>
            <option value="Household Items">Household Items</option>
            <option value="Dining Out / Snacks">Dining Out / Snacks</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="e.g., Vegetables from supermarket" 
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;