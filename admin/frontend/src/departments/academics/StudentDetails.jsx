/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './styles/studentDetails.css'; // Assuming you have a separate CSS file for styling
import axios from 'axios'
const StudentDetails = ({ student }) => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('transcript', selectedFile);



    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`http://localhost:3055/transcript/${student._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Transcript uploaded successfully!');
    } catch (error) {
      alert('Error uploading transcript.');
    }
  };

  //retrieve transcripts per student
  
  axios.get(`http://localhost:3055/transcript/${student._id}`)
  .then((res)=>{
    console.log(res);
  })
  .catch((error)=>{
    console.log(error);
  })

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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


      </div>
<div>
  {/* display the pdf from database here */}
</div>

      <div className='uploads'>
        <form onSubmit={handleFileUpload} className='add-resources'>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button className='btn-update' type="submit">Upload student Transcript</button>
        </form>

        <div className='add-resources'>
          <button className='btn-update'>Update Student Results</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
