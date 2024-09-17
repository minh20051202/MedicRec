/* General Styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f7f8;
    margin: 0;
    padding: 0;
    color: #333;
  }
  
  h2,
  h3 {
    text-align: center;
    color: #4caf50;
  }
  
  form {
    background: #ffffff;
    max-width: 600px;
    margin: 20px auto;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }
  
  input[type="text"],
  input[type="date"],
  input[type="datetime-local"],
  select {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  pre {
    background-color: #f4f7f8;
    border: 1px solid #ddd;
    padding: 20px;
    max-width: 600px;
    margin: 20px auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 8px;
    font-family: "Courier New", Courier, monospace;
  }
  
  h3 {
    margin-top: 40px;
    color: #333;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    form {
      padding: 20px;
    }
  
    input[type="text"],
    input[type="date"],
    input[type="datetime-local"],
    select {
      width: calc(100% - 16px);
      padding: 8px;
    }
  
    button {
      font-size: 16px;
    }
  }
