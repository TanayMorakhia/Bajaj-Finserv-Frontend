import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:8080/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid JSON input or API error');
    }
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' }
  ];

  const renderResponse = () => {
    if (!response) return null;
  
    return (
      <div>
        <h3>Response:</h3>
        <ul>
          {selectedOptions.map(option => {
            const value = response[option.value];
            if (value && value.length > 0) {
              return (
                <li key={option.value}>
                  <strong>{option.label}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="6"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON like { "data": ["A", "B", "C"] }'
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h3>Select Data to Display</h3>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
          />
        </div>
      )}

      {renderResponse()}
    </div>
  );
};

export default App;


