import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAmount = () => {
  const { name } = useParams();
  const [amount, setAmount] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [dates, setDates] = useState([]);
  const [total, setTotal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        const response = await axios.get(`https://shopbook-backend.onrender.com/get-amounts/${name}`);
        console.log('Fetched amounts:', response.data);
        
        // Convert ISO dates to local time
        const amountsData = response.data.amounts;
        const datesData = response.data.dates.map(date => new Date(date).toLocaleString()); // Convert to local time string
        
        setAmounts(amountsData);
        setDates(datesData);
        setTotal(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching amounts:', error);
      }
    };

    fetchAmounts();
  }, [name]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://shopbook-backend.onrender.com/add-amount', { name, amount: Number(amount) });
      const currentDate = new Date(); // Current date and time
      setAmounts(prevAmounts => [...prevAmounts, Number(amount)]);
      setDates(prevDates => [...prevDates, currentDate.toLocaleString()]); // Format as local time string
      setTotal(response.data.totalAmount);
      setAmount('');
    } catch (error) {
      console.error('Error adding amount:', error);
    }
  };

  return (
    <div>
      <h1>Add Amount for {decodeURIComponent(name)}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <button type="submit">Add Amount</button>
      </form>
      <div>
        <h2>Existing Amounts and Dates:</h2>
        <ul>
          {amounts.length > 0 ? (
            amounts.map((amt, index) => (
              <li key={index}>
                Amount: {amt} - Date: {dates[index]}
              </li>
            ))
          ) : (
            <p>No amounts available.</p>
          )}
        </ul>
      </div>
      <div>
        <h1>Total:</h1>
        <h3>{total}</h3>
      </div>
    </div>
  );
};

export default AddAmount;
