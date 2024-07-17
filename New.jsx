import React, { useState } from 'react';
import axios from 'axios';

function New() {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://shopbook-backend.onrender.com/new', { name})
      .then(response => {
        if (response.data.message === "user already existed") {
          alert('User already existed');
        } else if (response.data.status) {
          alert('Registered Successfully');
        } 
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
      <h1>Enter Name:</h1>
      <input type="text" name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter Name'/>
      </div>
    <div>
    <button type='submit'>Add</button>
    </div>
    </form>
    <a href='/'>back to home</a>
    </div>
  );
}

export default New

