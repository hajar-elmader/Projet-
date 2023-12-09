import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';



export default function Sendemailverification() {
  const [showModal, setShowModal] = useState(false);
  const [modalButtonClicked, setModalButtonClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgCode, setErrorMsgCode] = useState('');
  //verification input 
  const [verificationCode, setVerificationCode] = useState(Array(8).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const newVerificationCode = [...verificationCode];

    if (value.length > 1) {
      // Assurez-vous que chaque case ne contienne qu'un seul chiffre
      newVerificationCode[index] = value[value.length - 1];
    } else {
      newVerificationCode[index] = value;
    }

    setVerificationCode(newVerificationCode);

    // Passe automatiquement à la case suivante
    if (index < verificationCode.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // Passe automatiquement à la case précédente si on appuie sur la touche "Backspace" (Retour arrière) et que la case est vide
    if (event.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //send email ----------------------------------------
  const sendEmail = (email) => {
    const formData = new FormData();
    formData.append('email', email);
    const fetchData = {
      method: 'POST',
      body: formData,
    };
    return fetch('http://localhost:8080/api/user/api/public/forgot-password', fetchData)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Erreur lors de la requête');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email)
      .then(response => {
        console.log(response);
        if (response.success === false) {
          setErrorMsg(response.message);
        } else {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMsg('Erreur lors de la requête');
      });
  };
  //fin send email --------------------------------------------

  //send vérification code-------------------------------------
  const sendVerificationCode = (email,verificationCode) => {
    const formData = new FormData();
    console.log(email);
    console.log(verificationCode);
    formData.append('email', email);
    formData.append('verificationCode', verificationCode);
    const fetchData = {
      method: 'POST',
      body: formData,
    };
    return fetch('http://localhost:8080/api/user/api/public/verify-code', fetchData)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Erreur lors de la requête');
        }
      });
  };

  const handleSubmitVerificationCode = (e) => {
    e.preventDefault();
    sendVerificationCode(email,verificationCode)
      .then(response => {
        console.log(response);
        if (response.success === false) {
          setErrorMsgCode(response.message);
        } else {
           // Stocker les données nécessaires dans localStorage
          localStorage.setItem('resetPasswordData', JSON.stringify({ email: email, verificationCode: verificationCode }));
          window.location.href='/newpassword'
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMsgCode('Erreur lors de la requête');
      });
  };
  const divStyle = {
    marginTop: '123px',
    // Add more styles as needed
  };
  //fin send vérification code---------------------------------
  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>L'e-mail a été envoyé avec succès</Modal.Title>
        </Modal.Header>
        <Modal.Body>Veuillez vérifier votre boîte de réception.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              setModalButtonClicked(true);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container-fluid mt-5 p-0">
        {/* Votre code pour le reste de la page */}
        {/* Contact Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {!modalButtonClicked ? (
                <div className="col-12 col-md-6 " style={divStyle}>
                  <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <div className="testimonial-item bg-light rounded p-3">
                      <div className="bg-white border rounded p-4 shadow">
                        
                        <form onSubmit={handleSubmit}>
                          <div className="row g-3">
                            <h4 className="mb-3 fw-bold text-center m-auto">Entrer Votre Email</h4>

                            {/* Votre code pour afficher les messages d'erreur ici */}

                            <div className="col-12">
                              <div className="form-floating">
                              <label htmlFor="email">Email <span className='text-primary'>*</span></label>

                                <input
                                  className="form-control"
                                  placeholder="Entrer votre Email"
                                  type="email"
                                  id="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <button type="submit" className="btn btn-primary py-2 mt-3">Envoyer</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12 col-md-6">
                  <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <div className="testimonial-item bg-light rounded p-3">
                      <div className="bg-white border rounded p-4" style={divStyle}>
                        
                        <form onSubmit={handleSubmitVerificationCode}>
                          <div className="row g-3">
                            <h4 className="mb-3 fw-bold text-center mx-auto">Entrer le code envoyé par Email</h4>
                            {/* Votre code pour afficher les messages d'erreur ici */}
                            <div className="col-12">
                              <div className="form-floating d-flex justify-content-center align-items-center">
                                <div className="d-flex ">
                                  {verificationCode.map((digit, index) => (
                                    <React.Fragment key={index}>
                                      <div className="mb-3">
                                        <div className="input-wrapper">
                                          <input
                                            className="form-control mx-1 text-center"
                                            style={{ width: "50px" }}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(event) => handleInputChange(index, event)}
                                            onKeyDown={(event) => handleKeyDown(index, event)}
                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                          />
                                          <div className="input-line"></div>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                              <button type="submit" className="btn btn-primary py-2">Envoyer</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>


              )}



            </div>
          </div>

        </div>
        {/* Contact End */}
      </div>
    </div>
  );
}