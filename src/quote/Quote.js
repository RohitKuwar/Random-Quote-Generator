import React, { useState, useEffect } from 'react';
import styles from './quote.module.css';

function Quote() {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchRandomQuote() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const ran = data[Math.floor(Math.random() * data.length)];
      setQuote(ran);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false); // Even if there's an error, we should stop the loading state
    }
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div key={quote.author}>
            <h1>{quote.text}</h1>
            <h3>{quote.author ? quote.author : "unknown"}</h3>
          </div>
          <button onClick={fetchRandomQuote}>Fetch Quote</button>
        </>
      )}
    </div>
  );
}

export default Quote;
