import React, { useState } from 'react';

export default function Addclient() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setAlertMessage('User added successfully.');
                // Optionally, you can clear the form fields after successful submission
                setFormData({
                    email: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                });
            } else {
                setAlertMessage(`Error adding user: ${response.statusText}`);
            }
        } catch (error) {
            setAlertMessage(`Error adding user: ${error.message}`);
        }
    };

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="">
                    <div>
                        <div className="col-xl-9 col-lg-12">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h4 className="card-title m-auto">Ajouter un Client</h4>
                                </div>
                                <div className="card-body">
                                    {alertMessage && (
                                        <div className={`alert ${alertMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                                            {alertMessage}
                                        </div>
                                    )}
                                    <div className="basic-form">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Email</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Password</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
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
                                                        value={formData.firstname}
                                                        onChange={handleChange}
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
                                                        value={formData.lastname}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <div className="col-sm-10">
                                                    <button type="submit" className="btn btn-primary">
                                                        Ajouter
                                                    </button>
                                                </div>
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
