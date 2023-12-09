import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function EditClient() {
    const { id } = useParams(); // Récupérer l'ID de l'URL

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    useEffect(() => {
        // Fetch user data from the server based on the userId
        axios.get(`http://localhost:8080/api/user/getUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = () => {
        // Send a PUT request to update the user
        axios.put(`http://localhost:8080/api/user/updateUserInfo/${id}`, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        })
            .then(response => {
                console.log('User updated successfully:', response.data);
                // Handle success, e.g., show a success message or redirect the user
            })
            .catch(error => {
                console.error('Error updating user:', error);
                // Handle error, e.g., show an error message to the user
            });
    };
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="">
                    <div>
                        <div className="col-xl-9 col-lg-12">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h4 className="card-title m-auto">Modifier le Client</h4>
                                </div>
                                <div className="card-body">

                                    <div className="basic-form">
                                        <form >
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Email</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        name="email"
                                                        value={user.email} onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">First Name</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="First Name"
                                                        name="firstname"
                                                        value={user.firstname} onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Last Name</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                        name="lastname"
                                                        value={user.lastname} onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-10">
                                                    <Link type="submit" className="btn btn-primary" onClick={handleUpdateUser}>
                                                        Modifier
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="card-header text-center">
                                                <Link to="/banque">
                                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
