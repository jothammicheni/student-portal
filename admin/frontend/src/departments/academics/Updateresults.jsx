/* Updateresults.js */
import React, { useState } from 'react';
import './styles/updateresults.css';

const Updateresults = () => {
  // Define the subjects
  const subjects = [
    'MATH', 'ENG', 'KIS', 'HIS', 'GEO', 'CRE', 'AGR', 'BS', 'PHY', 'BIO', 'CHEM'
  ];

  // Split subjects into two arrays for two tables
  const half = Math.ceil(subjects.length / 2);
  const firstHalf = subjects.slice(0, half);
  const secondHalf = subjects.slice(half);

  // State for handling marks input
  const [marks, setMarks] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = ''; // Initialize each subject mark as an empty string
      return acc;
    }, {})
  );

  // State to store student ID
  const [studentId, setStudentId] = useState('');

  // Handle mark change for each subject
  const handleMarkChange = (subject, value) => {
    // Ensure that the input is a number between 0 and 100
    if (value === '' || (/^\d{0,3}$/.test(value) && Number(value) <= 100)) {
      setMarks((prevMarks) => ({
        ...prevMarks,
        [subject]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!studentId.trim()) {
      alert('Please enter a valid Student ID.');
      return;
    }

    // Ensure all marks are filled
    for (let subject of subjects) {
      if (marks[subject] === '') {
        alert(`Please enter marks for ${subject}.`);
        return;
      }
    }

    const data = {
      studentId,
      marks,
    };

    try {
      // Make a POST request to update student results in the backend
      const response = await fetch('http://localhost:3055/student/updateResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Results updated successfully!');
        // Reset form
        setMarks(subjects.reduce((acc, subject) => {
          acc[subject] = '';
          return acc;
        }, {}));
        setStudentId('');
      } else {
        const resData = await response.json();
        alert(`Failed to update results: ${resData.message || 'Unknown error.'}`);
      }
    } catch (error) {
      console.error('Error updating results:', error);
      alert('Error updating results.');
    }
  };

  return (
    <div className="update-results-container">
      <h1 className="update-results-heading">Update Student Results</h1>
      <form onSubmit={handleSubmit}>
        <div className="update-results-form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="update-results-input-field"
            placeholder="Enter Student ID"
          />
        </div>

        <div className="update-results-tables">
          {/* First Table */}
          <div className="update-results-table-container">
            <table className="update-results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {firstHalf.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>
                      <input
                        className="update-results-input"
                        type="number"
                        value={marks[subject]}
                        onChange={(e) => handleMarkChange(subject, e.target.value)}
                        placeholder="0-100"
                        min="0"
                        max="100"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Second Table */}
          <div className="update-results-table-container">
            <table className="update-results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {secondHalf.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>
                      <input
                        className="update-results-input"
                        type="number"
                        value={marks[subject]}
                        onChange={(e) => handleMarkChange(subject, e.target.value)}
                        placeholder="0-100"
                        min="0"
                        max="100"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="update-results-button" type="submit">
          Submit Results
        </button>
      </form>
    </div>
  );
};

export default Updateresults;
