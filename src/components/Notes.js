import React from 'react';

const Notes = () => {
  return (
    <div className="column column-50" id="notes">
      <h2>Notes</h2>
      <div className="notes-container">
         <textarea placeholder="What are you thinking about?"></textarea>
      </div>
    </div>
  )
}

export default Notes
