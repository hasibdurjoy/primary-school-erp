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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route exact path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addNewStudent' element={<AddNewStudent />} />
            <Route path='/allStudents' element={<SeeAllStudents />} />
            <Route path='/manageStudent/:studentId' element={<UpdateStudent />} />
            <Route path='/allInfo' element={<SchoolStudentInfo />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
