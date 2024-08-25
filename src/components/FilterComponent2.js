import React, { useState } from 'react';

export default function FilterComponent() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('Numbers');
  const [filteredResponse, setFilteredResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const data = JSON.parse(input).data;
    let result = [];

    if (filter === 'Numbers') {
      result = data.filter(item => !isNaN(item));
    } else if (filter === 'Letters') {
      result = data.filter(item => isNaN(item));
    }

    setFilteredResponse(result.join(','));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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
          borderRadius: '5px' 
        }}
      >
        Submit
      </button>
      <div style={{ marginTop: '20px' }}>
        <label>Multi Filter</label>
        <select 
          value={filter} 
          onChange={handleFilterChange} 
          style={{ 
            width: '100%', 
            marginBottom: '10px', 
            padding: '5px' 
          }}
        >
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="HighestLowercaseAlphabet">Highest lowercase alphabet</option>
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Filtered Response</label>
        <div>Numbers: {filteredResponse}</div>
      </div>
    </div>
  );
}
