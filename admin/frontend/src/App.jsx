import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Routes>
      <Route path='/' element={<Home />} />
      {/* You can add more routes here as needed */}
    </Routes>
    </div>
  );
}

export default App;
