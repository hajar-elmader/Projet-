import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import openEye from './open-eye.svg';
import closedEye from './closed-eye.svg';
class PasswordValidator {
  constructor(password) {
      this.password = password;
  }

}
export default function Password() {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const passwordValidator = new PasswordValidator(newPassword);
  const [passwordIsVisible, setPaswordIsVisible] = useState(false);
  const [passwordIsVisible1, setPaswordIsVisible1] = useState(false);

  useEffect(() => {
      // Récupérer les données depuis localStorage
      var resetPasswordData = JSON.parse(localStorage.getItem('resetPasswordData'));

      // Vérifier si les données existent
      if (resetPasswordData) {
          setEmail(resetPasswordData.email);
          setVerificationCode(resetPasswordData.verificationCode);

          // Utiliser les données récupérées
          console.log('Email:', resetPasswordData.email);
          console.log('Verification Code:', resetPasswordData.verificationCode);
      } else {
          // Les données n'existent pas dans localStorage
          setErrorMsg('Aucune donnée de réinitialisation de mot de passe trouvée.');
      }
  }, []);

  //*********************update password ************************
  const modifierPassword = (email, verificationCode, newPassword, repeatNewPassword) => {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('verificationCode', verificationCode);
      formData.append('newPassword', newPassword);
      formData.append('repeatNewPassword', repeatNewPassword)
      const fetchData = {
          method: 'PUT',
          body: formData,
      };
      return fetch(`http://localhost:8080/api/user/api/public/update-password`, fetchData)
          .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  throw new Error('Erreur lors de la requête');
              }
          });
  };

  // Methode submit Password --------------------
  const handleSubmitPassword = (event) => {
      event.preventDefault();
      if (newPassword.length === 0 || repeatNewPassword.length === 0) {
          setErrorMsg("Veuillez remplir tous les champs obligatoires");
          return;
      } else {
          modifierPassword(email, verificationCode, newPassword, repeatNewPassword)
              .then(response => {
                  if (response.success === false) {
                      setErrorMsg(response.message);
                  } else {
                      setShowModal(true);
                      // Supprimer les données de localStorage (facultatif)
                      localStorage.removeItem('resetPasswordData');
                  }
              })
              .catch(error => {
                  console.log(error);
                  setErrorMsg("Une erreur s'est produite");
              });
      }
  };
  const divStyle = {
    marginTop: '123px',
    // Add more styles as needed
  };

  return (
      <div>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                  <Modal.Title>Mot de passe réinitialisé avec succès</Modal.Title>
              </Modal.Header>
              <Modal.Body>Votre mot de passe a été réinitialisé avec succès. Veuillez vous connecter avec votre nouveau mot de passe.</Modal.Body>
              <Modal.Footer>
                  <Button
                      variant="primary"
                      onClick={() => {
                          setShowModal(false);
                          // Redirection vers la page de connexion
                          window.location.href = "/";
                      }}
                  >
                      Retour à la connexion
                  </Button>
              </Modal.Footer>
          </Modal>
          <div className="container-fluid m-5 p-0 " >
              {/* Contact Start */}
              <div className="container-xxl py-5"  style={divStyle}>
                  <div className="container">
                      <div className="row justify-content-center align-items-center">

                          <div className="col-12 col-md-6">
                              <div className="wow fadeInUp" data-wow-delay="0.1s">
                                  <div className="testimonial-item bg-light rounded p-3">
                                      <div className="bg-white border rounded p-4">

                                          <form onSubmit={handleSubmitPassword}>
                                              <div className="row g-3">
                                                  <h4 className="mb-3 fw-bold text-center m-auto p-3 ">Changer le mot de passe</h4>

                                                  {/* Votre code pour afficher les messages d'erreur ici */}


                                                  <div className="form-floating input-group col-md-12 form-group mt-3">
                                                      <input
                                                          type={passwordIsVisible ? 'text' : 'password'}
                                                          className="form-control"
                                                          id="newPassword"
                                                          name="password"
                                                          placeholder="Nouveau Mot De passe"
                                                          value={newPassword}
                                                          onChange={(e) => setNewPassword(e.target.value)}
                                                      />
                                                      <span className="input-group-append" onClick={() => setPaswordIsVisible((prevState) => !prevState)}>
                                                          <div className="input-group-text p-3">
                                                              <img id='search-icon' src={passwordIsVisible ? closedEye : openEye} alt='hide/show' width="20" />
                                                          </div>
                                                      </span>
                                                  </div>

                                                  <div className="form-floating input-group form-group col-md-12">
                                                      <input
                                                          type={passwordIsVisible1 ? 'text' : 'password'}
                                                          className="form-control"
                                                          placeholder="Retaper votre mot de passe"
                                                          id="repeatNewPassword"
                                                          value={repeatNewPassword}
                                                          onChange={(e) => setRepeatNewPassword(e.target.value)}
                                                      />
                                                      <span className="input-group-append" onClick={() => setPaswordIsVisible1((prevState) => !prevState)}>
                                                          <div className="input-group-text p-3">
                                                              <img id='search-icon' src={passwordIsVisible1 ? closedEye : openEye} alt='hide/show' width="20" />
                                                          </div>
                                                      </span>
                                                  </div>

                                                  <div className="col-6">
                                                      <button type="submit" className="btn btn-primary py-2">Confirmer</button>
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
              {/* Contact End */}
          </div>
      </div>
  );
}
