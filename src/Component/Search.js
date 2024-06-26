import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../Context/MyContextProvider';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Search = () => {
   
    const { travelDetails,loggedUserData } = useContext(SearchContext);
    const departureStationId = travelDetails.fromStation;
    const arrivalStationId = travelDetails.toStation;
    const departureDate = travelDetails.travelDate;
    const [trainsList, setTrainsList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const [trainId,settrainId] = useState([]);

    const [passengers, setPassengers] = useState([]);

    const [bookTicketObj, setbookTicketObj] = useState({
        "bookingId": 0,
        "trainId": 0,
        "passengerId": 0,
        "travelDate": "",
        "bookingDate": "",
        "totalSeats": 0,
        "TrainAppBookingPassengers": passengers
    });
    
    const [passengerObj, setpassengerObj] = useState({
        bookingId:0,
        passengerName: '',
        age: 0,
        seatNo: 0
    })
      
    const getTrainsBetweenStations = async () => {
        debugger
        try {
            const result = await axios.get('https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations?departureStationId=' + departureStationId + '&arrivalStationId=' + arrivalStationId + '&departureDate=' + departureDate);
 
            if (result.data.data != undefined) {
                setTrainsList(result.data.data);
            }
        } catch (error) {
            alert(error);
        }
    };

   
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


    useEffect(() => {
        getTrainsBetweenStations();
    }, [departureStationId, arrivalStationId, departureDate]);
    useEffect(() => {
        getAllStations();
    }, []);

     const bookTicket = (trainData) => {
        
        if (loggedUserData.phone == undefined) {
            toast.error('You have to Login first');
            navigate("/login");
        }
        else {
            setShow(true);
            setSelectedTrain(trainData);
            settrainId(trainData.trainId);
        }

    }
    const handleAddPassenger = () => {
        if (passengerObj.passengerName && passengerObj.age && passengerObj.seatNo) {
            setPassengers([...passengers, { ...passengerObj }]);
            
        }
        
        else{
            toast.error('Please fill pessengers details');
        }
        setpassengerObj({ passengerName: '', age: '' ,seatNo:''});
    };

    const bookTrainTicket = async()=>{
        
        const bookticketData ={
            ...bookTicketObj,
            trainId:trainId,
            passengerId:loggedUserData.passengerID,
            travelDate :departureDate,
            bookingDate:new Date(),
            totalSeats:passengers.length,
            TrainAppBookingPassengers:passengers

        }
        setbookTicketObj(bookticketData);
        // try {
        //     postData('BookTrain',bookticketData).then(result=>{
        //         if(result ==null){
                    
        //             toast.success('Ticket Booked...!');
        //             setShow(false);
        //             setPassengers([]);
        //         }
        //         else{
        //             toast.error('Error in booking Ticket');
        //         }
        //     })
        // } catch (error) {
        //     toast.error(error);
        // }
        try{
            const result = await axios.post('https://freeapi.miniprojectideas.com/api/TrainApp/BookTrain',bookticketData);
            if(result.data.data != undefined){
                toast.success('Book successfully');
            }
            else{
                toast.error(Error);
            }

        }catch(error){
            toast.error(Error);
        }
    }


    return (
       <>
        
            <div className="container-fluid bg-secondary p-4 pt-5 mt-5">
                <div className="row ">
                    <div className="col-4 px-4">
                    <select className="form-select">
                            {cityList.map((station, index) => {
                                return (
                                    <option key={station.stationID} value={station.stationID}>
                                        {station.stationName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                   
                        <div className="col-4 px-4">
                        <select className="form-select">
                            {cityList.map((station, index) => {
                                return (
                                    <option key={station.stationID} value={station.stationID}>
                                        {station.stationName}
                                    </option>
                                );
                            })}
                        </select>
                        
                    </div>
                    <div className="col-2 px-2">
                    <input type="text" className="form-control" value={departureDate} />
                    </div>
                    <div className="col-2 text-end">
                        <button type="button" className="btn btn-primary btn-sm">Modify Search</button>
                    </div>
                </div>
            </div>
        
            <div className="container-fluid pt-2">
                <p style={{ border: '1px solid', padding: '5px', marginTop: '5px' }}>
                    <strong>{trainsList.length}</strong> Result Found For <strong>Pune</strong> to <strong>Nagpur</strong> on {departureDate}
                </p>
                <div className="row">
                    {trainsList.map((trainData, index) => (
                        <div className="col-6 mt-2" key={index}>
                            <div className="card">
                                <div className="card-header bg-secondary text-white">
                                    {trainData.trainName}({trainData.trainNo})
                                </div>
                                <div className="card-body">
                                    <div className="row pb-2">
                                        <div className="col-5">
                                            {trainData.departureTime} | {trainData.departureStationName} | {trainData.departureDate}
                                        </div>
                                        <div className="col-2">
                                            15:05 hrs
                                        </div>
                                        <div className="col-5 text-end">
                                            {trainData.arrivalTime} | {trainData.arrivalStationName}
                                        </div>
                                    </div>
                                    <button className="btn btn-success btn-sm m-2" onClick={() => bookTicket(trainData)} >Book Now</button>
                                    <button className="btn btn-secondary btn-sm" >Check Availability</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
           
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTrain && (
                        <>
                            <div className="row">
                                <div className="col-8 text-end">
                                    Train: <strong>{selectedTrain.trainName}</strong>
                                </div>
                                <div className="col-4 text-end">
                                    Time:<strong>{selectedTrain.departureTime}</strong>
                                </div>
                            </div>
                            <div className="row pt-1">
                                <div className="col-6 mt-2">
                                    <Form.Group>
                                        <Form.Label>Passenger Name</Form.Label>
                                        <input type="text" className='form-control' placeholder='Enter Passenger Name' value={passengerObj.passengerName}
                                            onChange={(e) => setpassengerObj({ ...passengerObj, passengerName: e.target.value })} />
                                    </Form.Group>
                                </div>
                                <div className="col-3 mt-2">
                                    <Form.Group>
                                        <Form.Label>Age</Form.Label>
                                        <input type="text" className='form-control' placeholder='Enter Age' value={passengerObj.age}
                                            onChange={(e) => setpassengerObj({ ...passengerObj, age: e.target.value })} />
                                    </Form.Group>
                                </div>
                                <div className="col-3 mt-2">
                                    <Form.Group>
                                        <Form.Label>Seat No.</Form.Label>
                                        <input type="text" className='form-control' placeholder='Enter Seat No' value={passengerObj.seatNo}
                                            onChange={(e) => setpassengerObj({ ...passengerObj, seatNo: e.target.value })} />
                                    </Form.Group>
                                </div>
                                <div className="col-3 text-end pt-4 mt-3">
                                    <Button size="md" className="btn-primary" onClick={handleAddPassenger}>Add</Button>
                                </div>
                            </div>
                            {passengers.length > 0 && (
                                <Table bordered className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Passenger Name</th>
                                            <th>Age</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passengers.map((passenger, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{passenger.passengerName}</td>
                                                <td>{passenger.age}</td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => setPassengers(passengers.filter((_, i) => i !== index))}
                                                    >
                                                        Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </>
                    )}

                </Modal.Body>
               
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={bookTrainTicket}>
                        Book Ticket
                    </Button>
                </Modal.Footer>
            </Modal>

            
       </>
    );
};

export default Search;