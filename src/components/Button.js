import React from 'react';

export default function Button() {
  const handleSubmit = () => {
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}