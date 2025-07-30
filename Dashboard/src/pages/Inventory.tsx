import { useEffect, useState } from 'react';

const Inventory = () => {

  const [message, setMessage] = useState('');
   useEffect(() => {
    fetch('http://localhost:2507/api/test', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('Error connecting to backend:', err);
        setMessage('Backend connection failed');
      });
  }, []);

    return (
      <>
      <h1>Backend Response: {message}</h1>
      <h3>zkxjcbkxjb</h3>
      </>
    )
  }
  
  export default Inventory;