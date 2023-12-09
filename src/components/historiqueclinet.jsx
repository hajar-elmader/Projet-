import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Historiqueclinet() {
  const { email } = useParams();
  const [historique, setHistorique] = useState([]);
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
  useEffect(() => {
    // Appel à l'API pour récupérer l'historique
    fetchHistorique();
  }, [email]);
  return (
    <div>
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
        </div>    </div>
  );
}
