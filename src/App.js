import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import Search from './Component/Search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
     <Navbar/>
      <Routes>
      {/* <Route path="/" element={<Navbar/>}></Route> */}
      {/* <Route path="/" element={<Navbar/>}></Route> */}
      <Route path="/search" element={<Search/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
