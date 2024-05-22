import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const Passenger = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const [passengerObj, setPassengerObj] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassengerObj((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = () => {
        axios.post('https://freeapi.miniprojectideas.com/api/TrainApp/AddUpdatePassengers', passengerObj)
            .then(result => {
                if (result.data) {
                    toast.success('Passenger Added!');
                    setShow(false);
                } else {
                    toast.error('Failed to add passenger');
                }
            })
            .catch(error => {
                toast.error('An error occurred: ' + error.message);
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='card-header' style={{ backgroundColor: '#1e6a99' }}>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>First Name</label>
                                    <input type="text" placeholder='First Name' className='form-control' name="firstName" onChange={handleChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Last Name</label>
                                    <input type="text" placeholder='Last Name' className='form-control' name="lastName" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Email</label>
                                    <input type="text" placeholder='Email' className='form-control' name="email" onChange={handleChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Phone</label>
                                    <input type="text" placeholder='Phone' className='form-control' name="phone" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Password</label>
                                    <input type="text" placeholder='Password' className='form-control' name="password" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Passenger;
