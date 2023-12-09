
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(70);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    if (response.ok) {
      setShowSuccessModal(true);
      setProgress(100);

      // Decrease progress every second until it reaches 0
      const interval = setInterval(() => {
        setProgress((prevProgress) => Math.max(prevProgress - 10, 0));
      }, 1000);

      // Hide the modal and clear the interval after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        clearInterval(interval);
      }, 5000);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      console.log('Registration successful');
    } else {
      console.error('Registration failed');
    }
  };

  // Reset progress when modal is hidden
  useEffect(() => {
    if (!showSuccessModal) {
      setProgress(100);
    }
  }, [showSuccessModal]);

  return (
    <div className="h-100 m-5">
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 text-white">Sign up your account</h4>
                      <form onSubmit={handleRegister}>
                        <div className="form-group">
                          <label className="mb-1 text-white"><strong>FirstName</strong></label>
                          <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 text-white"><strong>LastName</strong></label>
                          <input type="text" className="form-control" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 text-white"><strong>Email</strong></label>
                          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 text-white"><strong>Password</strong></label>
                          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="text-center mt-4">
                          <button type="submit" className="btn bg-white text-primary btn-block">Register</button>
                        </div>
                      </form>
                      <div className="new-account mt-3">
                        <p className="text-white">
                          Already have an account? <Link className="text-white" to={'/'}>
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>User registration successful. Please wait for the confirmation from the bank.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
