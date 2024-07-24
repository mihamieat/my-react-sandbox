// Button.js
import React, { useState } from "react";
import "./Button.css";

const Button = ({ onClick, children, className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const username = "31a78663-bea1-46e4-89ee-bee64fd6dd95"; // replace with your username
  const password = "f5d-MP*gfLVFr6g"; // replace with your password
  const encodedCredentials = btoa(`${username}:${password}`);

  const handleClick = async () => {
    if (onClick) {
      onClick(); // Call the parent handler if needed
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.cts-strasbourg.eu/v1/siri/2.0/stop-monitoring?MonitoringRef=715A",
        {
          method: "GET",
          headers: {
            'Authorization': `Basic ${encodedCredentials}`
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`custom-button ${className}`}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Button;
