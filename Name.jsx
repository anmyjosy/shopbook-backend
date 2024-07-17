import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Name = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await axios.get('https://shopbook-backend.onrender.com/shop-names');
      setNames(response.data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>All Names:</h2>
        <ul>
          {names.map((name, index) => (
            <li key={index}>
              <Link to={`/add-amount/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <a href='new'>Add Name</a>
      </div>
    </div>
  );
};

export default Name;
