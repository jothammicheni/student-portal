/* eslint-disable react/prop-types */
import React from 'react';
import { FaUserPlus, FaUsers, FaEdit, FaFileAlt, FaCog } from 'react-icons/fa';

const AcademicMenu = ({ setShowAdminAction }) => {
  return (
    <ul>
      <li onClick={() => setShowAdminAction('register-student')}>
        <FaUserPlus />
        <p>Register Student</p>
      </li>
      <li onClick={() => setShowAdminAction('show-student')}>
        <FaUsers />
        <p>Show Students</p>
      </li>
      <li onClick={() => setShowAdminAction('update-student')}>
        <FaEdit />
        <p>Update Student Results</p>
      </li>
      <li onClick={() => setShowAdminAction('transcript')}>
        <FaFileAlt />
        <p>Transcripts</p>
      </li>
      <li onClick={() => setShowAdminAction('settings')}>
        <FaCog />
        <p>Settings</p>
      </li>
    </ul>
  );
};

export default AcademicMenu;
