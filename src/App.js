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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
