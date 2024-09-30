import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import './styles/showStudents.css'; // Importing the CSS file

const ShowStudents = ({ setShowAdminAction, setSelectedStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3055/student');
        setStudents(response.data.data); // Assuming your API response is structured like this
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="students-container">
      <h2>Student Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Class</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.Fname}</td>
                <td>{student.Surname}</td>
                <td>{calculateAge(student.DOB)}</td>
                <td>{student.Class}</td>
                <td>{student.ParentPhoneNo}</td>
                <td>
                  <FaEye title="View" className="action-icon" onClick={() => { 
                    setSelectedStudent(student); // Set the selected student data
                    setShowAdminAction('student-details'); 
                  }} />
                  <FaEdit style={{ color: 'green', marginLeft: '15px' }} title="Edit" className="action-icon" onClick={() => {
                    setShowAdminAction('update-student')                                       
                    } }/>
                  <FaTrash style={{ color: 'red', marginLeft: '15px' }} title="Delete" className="action-icon" onClick={() =>{ 
                    setShowAdminAction('delete-student'),
                    setSelectedStudent(student);
                    } }/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowStudents;
