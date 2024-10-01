/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './styles/studentDetails.css'; // Ensure this CSS file exists and is properly styled
import axios from 'axios';

const StudentDetails = ({ student,setShowAdminAction }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcripts, setTranscripts] = useState([]); // To store retrieved transcript data
  const [pdfUrls, setPdfUrls] = useState([]); // To store multiple PDF URLs

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('transcript', selectedFile);

    try {
      const response = await axios.post(`http://localhost:3055/transcript/${student._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Transcript uploaded successfully!');
      fetchTranscripts(); // Fetch transcripts again after successful upload
    } catch (error) {
      console.error('Error uploading transcript:', error);
      alert('Error uploading transcript.');
    }
  };

  // Function to fetch transcripts for a student
  const fetchTranscripts = async () => {
    try {
      const response = await axios.get(`http://localhost:3055/transcript/${student._id}`);
      setTranscripts(response.data);

      if (response.data.length > 0) {
        // Map each transcript to its URL
        const urls = response.data.map(transcript => ({
          id: transcript._id,
          url: `http://localhost:3055${transcript.fileUrl}`,
          filename: transcript.fileUrl.split('/').pop(),
        }));
        setPdfUrls(urls);
      } else {
        setPdfUrls([]);
      }
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      alert('Error fetching transcripts.');
    }
  };

  // Fetch transcripts when component mounts or student ID changes
  useEffect(() => {
    fetchTranscripts();
  }, [student._id]);

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Handle downloading a transcript
  const handleDownload = (url, filename) => {
    window.open(url, '_blank');
  };

  // Handle deleting a transcript
  const handleDelete = async (transcriptId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transcript?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3055/transcript/${transcriptId}`);
      alert('Transcript deleted successfully!');
      fetchTranscripts(); // Refresh transcripts list
    } catch (error) {
      console.error('Error deleting transcript:', error);
      alert('Error deleting transcript.');
    }
  };

  return (
    <div className="student-details-main-container">
      <div className="add-student-container">
        <h2>Student Details</h2>

        <table className="students-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Class</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr key={student._id}>
            <td>{student.Fname}</td>
            <td>{student.Surname}</td>
            <td>{calculateAge(student.DOB)}</td>
            <td>{student.Class}</td>
            <td>{student.ParentPhoneNo}</td>
          </tr>
        </tbody>
      </table>

      <table className="students-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Class</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr key={student._id}>
            <td>{student.Fname}</td>
            <td>{student.Surname}</td>
            <td>{calculateAge(student.DOB)}</td>
            <td>{student.Class}</td>
            <td>{student.ParentPhoneNo}</td>
          </tr>
        </tbody>
      </table>

        {/* Display existing transcripts */}
        <div>
          <h3>Uploaded Transcripts</h3>
          {transcripts.length === 0 ? (
            <p>No transcripts uploaded yet.</p>
          ) : (
            <ul>
              {transcripts.map(transcript => (
                <li key={transcript._id}>
                  <a  href={`http://localhost:3055${transcript.fileUrl}`} target="_blank" rel="noopener noreferrer"  onClick={handleDownload}>
                    {transcript.fileUrl.split('/').pop()}
                  </a>
                  <button

                    onClick={() => handleDelete(transcript._id)}
                    style={{ marginLeft: '10px', color: 'white', cursor: 'pointer',backgroundColor:'red',width:'auto' ,padding:'5px'}}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="uploads">
        {/* Transcript Upload Form */}
        <form onSubmit={handleFileUpload} className="add-resources">
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button  className="btn-update" type="submit">Upload Student Transcript</button>
        </form>

        {/* Placeholder for updating student results */}
        <div className="add-resources">
          <button className="btn-update" onClick={()=>setShowAdminAction('update-result')}>Update Student Results</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
