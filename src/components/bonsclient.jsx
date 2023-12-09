import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Bonsclient() {
    const [users, setUsers] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        // Utilisez Axios pour récupérer les données du backend
        axios.get('http://localhost:8080/api/user/highBalanceUsers')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Erreur lors de la récupération des utilisateurs à solde élevé', error));
    }, []);

    const getSoldeColor = (solde) => {
        // Appliquez la logique de couleur en fonction de la valeur du solde
        if (solde > 20000) {
            return 'text-success'; // vert
        } else if (solde < 3000) {
            return 'text-warning'; // jaune
        } else {
            return ''; // par défaut
        }
    };
    const deleteUser = (userId) => {
        axios.delete(`http://localhost:8080/api/user/deleteUser/${userId}`)
            .then(response => {
                console.log(response.data);
                // Mettez à jour la liste des utilisateurs après la suppression
                setUsers(users.filter(user => user.id !== userId));
                // Afficher l'alerte de suppression réussie
                setShowSuccessAlert(true);
                // Cacher l'alerte après 5 secondes
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 5000);
            })
            .catch(error => console.error('Erreur lors de la suppression de l\'utilisateur', error));
    };

    return (
        <div class="content-body">

            <div class="container-fluid">

                <div class="row">
                    <div className="col-md-3">
                        {/* Votre contenu de la barre latérale ici */}
                        <div className="card">
                            <div className="card-body">
                                <li><Link to={'/addclient'} className=''>Ajouter Client</Link></li>
                                <li><Link to={'/banque'} className=''>Afficher tout les clients</Link></li>


                            </div>
                        </div>
                    </div><div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Tout les clients</h4>
                            </div>
                            <div className="card-body">
                                {showSuccessAlert && (
                                    <div className="alert alert-success" role="alert">
                                        Utilisateur supprimé avec succès.
                                    </div>
                                )}
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th className="width50">
                                                    <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                                                        <input type="checkbox" className="custom-control-input" id="checkAll" required />
                                                        <label className="custom-control-label" htmlFor="checkAll" />
                                                    </div>
                                                </th>
                                                <th>Id</th>

                                                <th>Nom et Prénom</th>
                                                <th>Email</th>
                                                <th>Id Beneficiaire</th>

                                                <th>Solde</th>

                                                <th>Status</th>
                                                <th className=''>Supprimer</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>
                                                        {/* Votre logique pour la case à cocher ici */}
                                                    </td>
                                                    <td><div className="d-flex align-items-center">{/* Image/avatar ici */}<span className="w-space-no">{user.id}</span></div></td>

                                                    <td><div className="d-flex align-items-center">{/* Image/avatar ici */}<span className="w-space-no">{user.firstname} {user.lastname}</span></div></td>
                                                    <td className={getSoldeColor(user.solde)}>{user.email}</td>
                                                    <td><div className="d-flex align-items-center">{/* Image/avatar ici */}<span className="w-space-no">{user.idBeneficiaire}</span></div></td>

                                                    <td><div className="d-flex align-items-center">{/* Image/avatar ici */}<span className="w-space-no">{user.solde}</span></div></td>

                                                    <td><div className="d-flex align-items-center"><i className={`fa fa-circle ${getSoldeColor(user.solde)} mr-1`} />{/* Status ici */}</div></td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-danger shadow btn-xs sharp" onClick={() => deleteUser(user.id)}>
                                                                <i className="fa fa-trash" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div></div>
            </div>
        </div>)
}
