/* eslint-disable react/prop-types */
import axios from 'axios';
import './styles/deleteStudent.css'

const DeleteStudent = ({ student ,setShowAdminAction}) => {

  const deleteStudent = () => {
    const confirmation = window.confirm("Are you sure you want to delete this student?");
    if (confirmation) {
      console.log(student._id);
      axios.delete(`http://localhost:3055/student/${student._id}`)
        .then(() => {
          alert("Delete successful");
          setShowAdminAction('show-student');
        })
        .catch(error => alert("Error deleting student: " + error));
    }
  };

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="delete-container">
      <h3>Selected Student Information</h3>
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

      <div className='btn-holder'>
        <button className='btn-del' onClick={deleteStudent}>Confirm Delete</button>
      </div>
    </div>
  );
};

export default DeleteStudent;
