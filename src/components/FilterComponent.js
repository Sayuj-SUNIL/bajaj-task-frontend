import React, { useState } from 'react';
import axios from 'axios';

export default function FilterComponent() {
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState('');
  const [response, setResponse] = useState(null);
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [savedAlphabets, setSavedAlphabets] = useState([]);
  const [savedHighestLowercaseAlphabet, setSavedHighestLowercaseAlphabet] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Check if the input is a valid JSON
    try {
      JSON.parse(value);
      setInputError(''); // Clear any previous error
    } catch (err) {
      setInputError('Invalid JSON input');
    }
  };

  const handleSubmit = async () => {
    // Prevent submission if JSON is invalid
    if (inputError) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedInput = JSON.parse(input);
      const response = await axios.post('/process', { data: parsedInput.data });

      const result = response.data;
      setResponse(result);

      // Save the result values
      setSavedNumbers(result.numbers);
      setSavedAlphabets(result.alphabets);
      setSavedHighestLowercaseAlphabet(result.highest_lowercase_alphabet);

      applyFilters(result);

    } catch (err) {
      console.log(err);
      setError('Failed to submit data to the backend');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) =>
      checked ? [...prev, value] : prev.filter((filter) => filter !== value)
    );

    if (response) {
      const updatedFilters = checked
        ? [...filters, value]
        : filters.filter((filter) => filter !== value);

      applyFilters(response, updatedFilters);
    }
  };

  const applyFilters = (result, activeFilters = filters) => {
    let filteredData = [];

    if (activeFilters.includes('Numbers')) {
      filteredData.push(`Numbers: ${savedNumbers.join(',')}`);
    }
    if (activeFilters.includes('Alphabets')) {
      filteredData.push(`Alphabets: ${savedAlphabets.join(',')}`);
    }
    if (activeFilters.includes('HighestLowercaseAlphabet')) {
      filteredData.push(
        `Highest Lowercase Alphabet: ${savedHighestLowercaseAlphabet}`
      );
    }

    setFilteredResponse(filteredData.join(' | '));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <div>
        <label>API Input</label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        {inputError && <div style={{ color: 'red' }}>{inputError}</div>}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: inputError ? 'not-allowed' : 'pointer',
        }}
        disabled={!!inputError || loading} // Disable the button if there's an input error or loading
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <label>Multi Filter</label>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              checked={filters.includes('Numbers')}
              onChange={handleFilterChange}
              disabled={!response} // Disable filter if there's no response
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              checked={filters.includes('Alphabets')}
              onChange={handleFilterChange}
              disabled={!response} // Disable filter if there's no response
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="HighestLowercaseAlphabet"
              checked={filters.includes('HighestLowercaseAlphabet')}
              onChange={handleFilterChange}
              disabled={!response} // Disable filter if there's no response
            />
            Highest Lowercase Alphabet
          </label>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Filtered Response</label>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <div>{filteredResponse}</div>
        )}
      </div>
    </div>
  );
}
