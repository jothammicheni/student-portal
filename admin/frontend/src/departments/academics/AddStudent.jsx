import { useState } from 'react';
import './styles/AddStudent.css'; // Assuming you create a separate CSS file for styling
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    Fname: '',
    Surname: '',
    Lastname: '',
    Email: '',
    AdmNo: '',
    Class: 'Form1', // Default value for the dropdown
    ParentName: '',
    DOB: '',
    ParentPhoneNo: '',
    MedicalCondition: false,
    ConditionDetails: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await axios.post('http://localhost:3055/student', formData);
      console.log("Data inserted successfully");

      // Reset the form after successful submission
      setFormData({
        Fname: '',
        Surname: '',
        Lastname: '',
        Email: '',
        AdmNo: '',
        Class: 'Form1',
        ParentName: '',
        DOB: '',
        ParentPhoneNo: '',
        MedicalCondition: false,
        ConditionDetails: ''
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="add-student-container">
      <h2>Register New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="Fname" placeholder="First Name" value={formData.Fname} onChange={handleChange} required />
          <input type="text" name="Surname" placeholder="Surname" value={formData.Surname} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <input type="text" name="Lastname" placeholder="Last Name" value={formData.Lastname} onChange={handleChange} required />
          <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <select name="Class" value={formData.Class} onChange={handleChange} required>
            <option value="Form1">Form1</option>
            <option value="Form2">Form2</option>
            <option value="Form3">Form3</option>
            <option value="Form4">Form4</option>
          </select>
          <input type="text" name="AdmNo" placeholder="Admission Number" value={formData.AdmNo} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <input type="text" name="ParentName" placeholder="Parent Name" value={formData.ParentName} onChange={handleChange} required />
          <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <input type="tel" name="ParentPhoneNo" placeholder="Parent Phone No" value={formData.ParentPhoneNo} onChange={handleChange} required />
        </div>

        <div className="medical-condition">
          <label>
            <input type="checkbox" name="MedicalCondition" checked={formData.MedicalCondition} onChange={handleChange} className="checkbox" />
            Any Medical Condition?
          </label>
        </div>

        {formData.MedicalCondition && (
          <input
            style={{ width: '100%', height: '40px' }}
            type="text"
            name="ConditionDetails"
            className="checkbox"
            placeholder="Specify Condition"
            value={formData.ConditionDetails}
            onChange={handleChange}
          />
        )}

        <button type="submit">Register Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
