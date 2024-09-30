/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React,{useState} from 'react';
import './styles/AddStudent.css'; // Assuming you have a separate CSS file for styling
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
      const response = await axios.post(`/api/transcripts/upload/${student._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Transcript uploaded successfully!');
    } catch (error) {
      alert('Error uploading transcript.');
    }
  };


  return (
    <div className="add-student-container">
      <h2>Student Details</h2>
      <form>
        <div className="form-row">
          <label>First Name:</label>
          <input
            type="text"
            name="Fname"
            placeholder="First Name"
            value={student.Fname}
            readOnly
            style={{ color: 'green' }}
          />
          <label>Surname:</label>
          <input
            type="text"
            name="Surname"
            placeholder="Surname"
            value={student.Surname}
            readOnly
            style={{ color: 'green' }}
          />
        </div>

        <div className="form-row">
          <label>Last Name:</label>
          <input
            type="text"
            name="Lastname"
            placeholder="Last Name"
            value={student.Lastname}
            readOnly
            style={{ color: 'green' }}
          />
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={student.Email}
            readOnly
            style={{ color: 'green' }}
          />
        </div>

        <div className="form-row">
          <label>Class:</label>
          <input
            type="text"
            name="Class"
            placeholder="Class"
            value={student.Class}
            readOnly
            style={{ color: 'green' }}
          />
          <label>Admission Number:</label>
          <input
            type="text"
            name="AdmNo"
            placeholder="Admission Number"
            value={student.AdmNo}
            readOnly
            style={{ color: 'green' }}
          />
        </div>

        <div className="form-row">
          <label>Parent Name:</label>
          <input
            type="text"
            name="ParentName"
            placeholder="Parent Name"
            value={student.ParentName}
            readOnly
            style={{ color: 'green' }}
          />
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DOB"
            value={new Date(student.DOB).toISOString().split('T')[0]}
            readOnly
            style={{ color: 'green' }}
          />
        </div>

        <div className="form-row">
          <label>Parent Phone No:</label>
          <input
            type="tel"
            name="ParentPhoneNo"
            placeholder="Parent Phone No"
            value={student.ParentPhoneNo}
            readOnly
            style={{ color: 'green' }}
          />
        </div>

        <div className="medical-condition">
          <label>
            <input
              type="checkbox"
              name="MedicalCondition"
              checked={student.MedicalCondition}
              readOnly
              className="checkbox"
            />
            Any Medical Condition?
          </label>
        </div>

        {student.MedicalCondition && (
          <div>
            <label>Condition Details:</label>
            <input
              style={{ width: '100%', height: '40px', color: 'green' }}
              type="text"
              name="ConditionDetails"
              className="checkbox"
              placeholder="Specify Condition"
              value={student.ConditionDetails}
              readOnly
            />
          </div>
        )}

        {/* No button since this is a read-only form */}
      </form>


      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload Transcript</button>
      </form>
    </div>
  );
};

export default StudentDetails;
