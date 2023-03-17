import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from './components/Protected';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/home" element={<Protected><Home/></Protected>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
