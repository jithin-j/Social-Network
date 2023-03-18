import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from './components/Protected';
import User from '../src/pages/User';
import Search from './pages/Search';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/home" element={<Protected><Home/></Protected>}/>
          <Route path="/friends/:id" element={<Protected><User/></Protected>}/>
          <Route path="/users/search" element={<Protected><Search/></Protected>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
