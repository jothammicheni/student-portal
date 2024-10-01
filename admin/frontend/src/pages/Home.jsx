import React, { useState } from 'react';
import './styles/home.css'; // Import the CSS file
import MainAdminMenu from '../components/MainAdminMenu';
import AcademicMenu from '../components/AcademicMenu';
import FinanceMenu from '../components/FinanceMenu';
import AddStudent from '../departments/academics/AddStudent';
import Updateresults from "../departments/academics/Updateresults";
import ShowStudents from "../departments/academics/ShowStudents";
import AcademicWelcomePage from "../departments/academics/AcademicWelcomePage";
import AdminWelcomePage from "../departments/admin/AdminWelcomePage";
import FinanceWelcomePage from "../departments/finance/FinanceWelcomePage";
import DeleteStudent from "../departments/academics/DeleteStudent";
import StudentDetails from '../departments/academics/StudentDetails';

import logo from '../assets/logo.png'; // Adjust the path as necessary

const Home = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userCategory, setUserCategory] = useState('academic');
  const [showAdminAction, setShowAdminAction] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student

  return (
    <div className="Home-container">
      <div className="menu-sidebar">
        <div className="logo-holder">
          <img src={logo} alt="Logo" className="logo" /> {/* Add logo here */}
        </div>
        <div className="admin-actions-holder">
          {isLoggedIn ? (
            userCategory === 'finance' ? (
              <FinanceMenu setShowAdminAction={setShowAdminAction} />
            ) : userCategory === 'academic' ? (
              <AcademicMenu setShowAdminAction={setShowAdminAction} />
            ) : userCategory === 'admin' ? (
              <MainAdminMenu setShowAdminAction={setShowAdminAction} />
            ) : null // Fallback if userCategory doesn't match
          ) : (
            <p>Please log in</p> // Display when not logged in
          )}
        </div>
      </div>

      <div className='admin-main-page'>
        <div className='greetings-section'>
          <h3>Evening Jotham  👋</h3>
        </div>
        {isLoggedIn ? (
          userCategory === 'academic' ? (
            showAdminAction === 'register-student' ? (
              <AddStudent/>
            ) : showAdminAction === 'update-result' ? (
              <Updateresults />
            ) : showAdminAction === 'show-student' ? (
              <ShowStudents setShowAdminAction={setShowAdminAction} setSelectedStudent={setSelectedStudent} />
            ) : showAdminAction === 'delete-student' ? (
              <DeleteStudent  student={selectedStudent} setShowAdminAction={setShowAdminAction}  />
            ) : showAdminAction === 'student-details' ? (
              <StudentDetails student={selectedStudent} setShowAdminAction={setShowAdminAction}/> // Pass the selected student data
            ) : (
              <AddStudent />
            )
          ) : userCategory === 'finance' ? (
            showAdminAction === 'b' ? (
              <AddStudent />
            ) : showAdminAction === 'c' ? (
              <Updateresults />
            ) : showAdminAction === 'd' ? (
              <ShowStudents setShowAdminAction={setShowAdminAction} setSelectedStudent={setSelectedStudent} />
            ) : (
              <FinanceWelcomePage />
            )
          ) : userCategory === 'admin' ? (
            showAdminAction === 'a' ? (
              <AddStudent />
            ) : showAdminAction === 'u' ? (
              <Updateresults />
            ) : showAdminAction === 's' ? (
              <ShowStudents setShowAdminAction={setShowAdminAction} setSelectedStudent={setSelectedStudent} />
            ) : (
              <AdminWelcomePage />
            )
          ) : null // Fallback if userCategory doesn't match
        ) : (
          <p>Please log in</p> // Display when not logged in
        )}
      </div>
    </div>
  );
}

export default Home;
