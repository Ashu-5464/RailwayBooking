import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './Component/Search';
import { MyContextProvider } from './Context/MyContextProvider';
import Login from './Component/Login';
import Passanger from './Component/Passanger';

function App() {
  return (
    <div className="App">
      <MyContextProvider>
       <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/passanger" element={<Passanger/>}></Route>
      </Routes>
      </BrowserRouter>
      </MyContextProvider>
    </div>
  );
}

export default App;