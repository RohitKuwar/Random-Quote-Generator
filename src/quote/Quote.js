import React, { useState, useEffect } from 'react';
import styles from './quote.module.css';

function Quote() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRandomQuote() {
    try {
      fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(data => {
        setLoading(true)
        const ran = data[Math.floor(Math.random() * 100)];
        setQuote(ran)
      })
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className={styles.container}>
        {
          loading ?
          <><div key={quote.author}>
            <h1>{quote.text}</h1>
            <h3>{quote.author === null ? "unknown" : quote.author}</h3>
          </div><button onClick={fetchRandomQuote}>Fetch Quote</button></>
          : <p>loading...</p>
        }
    </div>
  )
}

export default Quote