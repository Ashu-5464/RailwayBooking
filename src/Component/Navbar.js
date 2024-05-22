import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Main.css';
import bannerImage from '../assets/banner-2.png'; // Import the image
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContextProvider, SearchContext, useSearchContext } from '../Context/MyContextProvider'; // Assuming you have defined MyContextProvider correctly

const Navbar = () => {
    const [cityList, setCityList] = useState([]);
    const [hideImageDiv , sethideImageDiv] = useState([]);
    const navigate = useNavigate();
   const { updateTravelDetails} = useContext(SearchContext);
   const [stationObj, setStationObj] = useState({
    fromStation: "",
    toStation: "",
    travelDate: "",
  });

    const handleSearchButtonClick = () => { 
        navigate('/search');
        sethideImageDiv(false);
    };
 

      const handleChange = (field,value) => {
    const updatedStationObj ={...stationObj,[field]:value};
    setStationObj(updatedStationObj);
    updateTravelDetails(updatedStationObj);
  };

   
    useEffect(() => {
        getAllStations();
    }, []);

    const getAllStations = async () => {
        try {
            const result = await axios.get('https://freeapi.miniprojectideas.com/api/TrainApp/GetAllStations');
            if (result.data.data != undefined) {
               setCityList(result.data.data);
            }

        } catch (error) {
            alert('Error');
        }
    }


    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-light nav-yellow fixed-top border-bottom border-top p-0">
                <div className="container">
                    <a className="navbar-brand fs-4 fw-bold" href="#">
                        <i className="fa fa-cart-shopping fs-4" style={{ color: '#f54242' }}></i>
                        <span className="text-white"> Railway </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                            <li className="nav-item">
                                <a className="nav-link fw-semibold text-white me-1" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold text-white me-1" href="#">Trains</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold text-white me-1" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {hideImageDiv && (
            <div className="container pt-3 mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12 col-xl-11">
                        <div className="text-black">
                            <div className="">
                                <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-1">Book Ticket</p>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-8 col-xl-5 order-2 order-lg-1">
                                        <form className="mx-1 mx-md-4 pt-5">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label className="form-label" htmlFor="fromStation">From Station</label>
                                                    <select id="fromStation" className="form-select"
                                                     onChange={(e) => handleChange('fromStation',e.target.value)}>
                                                    <option value="From Station">From Station</option>
                                                        {cityList.map(city => (
                                                            <option key={city.stationID} value={city.stationID}>
                                                                {city.stationName} 
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label" htmlFor="toStation">To Station</label>
                                                    <select id="toStation" className="form-select"
                                                     onChange={(e) => handleChange('toStation',e.target.value)}>
                                                        <option value="To Station">To Station</option>
                                                        {cityList.map(city => (
                                                            <option key={city.stationID} value={city.stationID}>
                                                                {city.stationName} 
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row pt-3">
                                                <div className="col-6">
                                                    <label className="form-label" htmlFor="travelDate">Date Of Travel</label>
                                                    <input type="date" id="travelDate" className="form-control" 
                                                      onChange={(e) => handleChange('travelDate',e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-4 mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary" onClick={handleSearchButtonClick}>Search</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 pt-3 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        {/* Adjust the image source to your image file */}
                                        <img src={bannerImage} className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
)}
        </>


    );
}

export default Navbar;