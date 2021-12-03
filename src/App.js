import './App.css';
import Home from './pages/Home/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/Home/Dashboard/Dashboard';
import Navigation from './pages/Home/Navigation/Navigation';
import AddNewStudent from './pages/Home/AddNewStudent/AddNewStudent';
import SeeAllStudents from './pages/Home/SeeAllStudents/SeeAllStudents';
import UpdateStudent from './pages/Home/UpdateStudent/UpdateStudent';
import SchoolStudentInfo from './pages/Home/SchoolStudentInfo/SchoolStudentInfo';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Register from './pages/Authentication/Register/Register';
import Login from './pages/Authentication/Login/Login';
import Header from './pages/Shared/Header/Header';
import PrivateRoute from './pages/Authentication/PrivateRoute/PrivateRoute';
import AddMultipleStudent from './pages/Home/AddMultipleStudent/AddMultipleStudent';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<><Header /> <Login /></>} />
            <Route path='/register' element={<><Header /> <Register /></>} />
            <Route path="/dashboard" element={<PrivateRoute><Navigation /></PrivateRoute>} >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/dashboard/addNewStudent' element={<AddNewStudent />} />
              <Route path='/dashboard/addMultipleStudent' element={<AddMultipleStudent />} />
              <Route path='/dashboard/allStudents' element={<SeeAllStudents />} />
              <Route path='/dashboard/manageStudent/:studentId' element={<UpdateStudent />} />
              <Route path='/dashboard/allInfo' element={<SchoolStudentInfo />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
