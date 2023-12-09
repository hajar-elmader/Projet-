import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function EspaceClient() {
  const searchParams = new URLSearchParams(window.location.search);
  const firstname = searchParams.get('firstname');
  const lastname = searchParams.get('lastname');
  const email = searchParams.get('email');
  const [solde, setSolde] = useState(null);
  const [idBeneficiaire, setIdBeneficiaire] = useState(null);
  const [idBeneficiaireInput, setIdBeneficiaireInput] = useState('');
  const [montantInput, setMontantInput] = useState('');
  const [transfertStatus, setTransfertStatus] = useState(null);
  const [historique, setHistorique] = useState([]);

  // Déplacer la définition de fetchHistorique à l'extérieur du useEffect
  const fetchHistorique = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/historique/byUsername/${email}`);
      const historiqueData = response.data;

      // Mettre à jour l'état avec l'historique récupéré
      setHistorique(historiqueData);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
    }
  };

  // Déplacer la définition de fetchUserInfo à l'extérieur du useEffect
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/info/${email}`);
      const userInfo = response.data;
      setSolde(userInfo.solde);
      setIdBeneficiaire(userInfo.idBeneficiaire);
    } catch (error) {
      console.error('Error fetching user information:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    // Appel à l'API pour récupérer l'historique
    fetchHistorique();
  }, [email]);

  useEffect(() => {
    // Appel à l'API pour récupérer les informations
    fetchUserInfo();
  }, [email]);

  const handleViewHistorique = () => {
    const historiqueElement = document.getElementById('historique');
    historiqueElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');

    // Rediriger vers la page d'accueil
    window.location.href = '/';
  };

  const handleTransfer = async (event) => {
    event.preventDefault();

    // Valider les champs d'entrée
    if (!idBeneficiaireInput || !montantInput) {
      console.error('ID bénéficiaire et Montant sont obligatoires.');
      return;
    }

    try {
      // Effectuer la requête POST pour le transfert d'argent
      await axios.post(`http://localhost:8080/api/user/subtractBalanceFromUser/${idBeneficiaireInput}/${montantInput}/${email}`);
      setIdBeneficiaireInput('');
      setMontantInput('');
      setTransfertStatus('success');

      // Rafraîchir les informations après le transfert
      fetchUserInfo();
      fetchHistorique();
    } catch (error) {
      console.error('Erreur lors du transfert d\'argent:', error);
      setTransfertStatus('error');
    }
  };
  return (
    <div>
      <div className="col-xl-12">
        <div className="card mt-5">
          <div className="card-body">
            <div className=" mb-5">
              <div className="text-center">
                <h3 className='mb-5'>Bonjour Mr/Mme, {firstname} {lastname}!</h3>
                <div className="row mb-5">
                  <div className="col">
                    <span>Solde</span><h3 className="m-b-0">{solde} DH</h3>
                  </div>
                  <div className="col">
                    <span>ID Bénéficiaire</span><h3 className="m-b-0">{idBeneficiaire}</h3>
                  </div>
                </div>
                <div className="form-group row">
                              <div className="col-sm-10 text-center m-auto">
                                <button type="button" className="btn btn-secondary mr-2" onClick={handleViewHistorique}>Voir l'historique</button>
                                <button type="button" className="btn btn-danger mr-2" onClick={handleLogout}>Déconnexion</button>
                               </div>
                            </div>
                <div className="mt-4">
                  <div className="col-xl-12 col-lg-12">
                    <div className="card">
                      
                      <div className="card-header text-center">
                        <h4 className="card-title mx-auto">Transfert d'argent</h4>
                      </div>
                      {transfertStatus === 'success' && <div className="alert alert-success mt-2">Transfert effectué avec succès.</div>}
                                {transfertStatus === 'error' && <div className="alert alert-danger mt-2">Votre solde est insuffisant</div>}
                              
                      <div className="card-body">
                        <div className="basic-form">
                          <form >
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">ID bénéficiaire</label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ID bénéficiaire"
                                  value={idBeneficiaireInput}
                                  onChange={(e) => setIdBeneficiaireInput(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Montant</label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Montant DH"
                                  value={montantInput}
                                  onChange={(e) => setMontantInput(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-7 ml-4">
                                <button type="submit" className="btn btn-primary mr-2" onClick={handleTransfer}>Transférer</button>
            
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
        </div>
        <div className="col-lg-12" id="historique">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Historique des transactions</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th className="width80">#</th>
                      <th>ID Bénéficiaire</th>
                      <th>Montant</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historique.map((transaction, index) => (
                      <tr key={index}>
                        <td><strong>{index + 1}</strong></td>
                        <td>{transaction.idBeneficiaire}</td>
                        <td>{transaction.montant} DH</td>
                        <td>{new Date(transaction.dateCreation).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8" />
      </div>
    </div>

  );
}
