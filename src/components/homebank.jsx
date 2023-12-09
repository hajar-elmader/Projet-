import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faUserPlus, faListAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Homebank() {
    const [users, setUsers] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const firstname = searchParams.get('firstname');
    const lastname = searchParams.get('lastname');
    const email = searchParams.get('email');
    useEffect(() => {
        // Utilisez Axios pour récupérer les données du backend
        axios.get('http://localhost:8080/api/user/allUsers')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Erreur lors de la récupération des utilisateurs', error));
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

    const activateUser = (userId) => {
        // Envoyer une requête au backend pour activer l'utilisateur
        axios.post(`http://localhost:8080/api/user/activateUser/${userId}`)
            .then(response => {
                console.log(response.data);
                // Mettre à jour la liste des utilisateurs après l'activation
                setUsers(users.map(user => (user.id === userId ? { ...user, estValid: true } : user)));
            })
            .catch(error => console.error('Erreur lors de l\'activation de l\'utilisateur', error));
    };
    const handleLogout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');

        // Rediriger vers la page d'accueil
        window.location.href = '/';
    };
    // Déplacer la définition de fetchUserInfo à l'extérieur du useEffect
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/info/${email}`);
            const userInfo = response.data;

        } catch (error) {
            console.error('Error fetching user information:', error);
            // Handle the error, e.g., display an error message to the user
        }
    };
    useEffect(() => {
        // Appel à l'API pour récupérer les informations
        fetchUserInfo();
    }, [email]);
    return (
        <div class="">
            <div class="container-fluid">
                <h3 className='m-3 mt-4'>Bonjour Mr le, "{firstname} {lastname}"</h3>

                <div class="row">

                    <div className="col-md-3 ">

                        {/* Votre contenu de la barre latérale ici */}
                        <div className="card">
                            <div className="card-body">
                                <li>
                                    <Link to={'/addclient'} className='btn'>
                                        <FontAwesomeIcon icon={faUserPlus} className='mr-2' /> Ajouter Client
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/bonsclients'} className=''>
                                        <FontAwesomeIcon icon={faListAlt} className='mr-2' /> Afficher tous les bons clients
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" className="btn" onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Déconnexion
                                    </button>
                                </li>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header ">
                                <h4 className="card-title text-center m-auto">Tout les clients</h4>
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
                                                <th className=''>Action</th>
                                                <th className=''>Valider</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>
                                                        {/* Votre logique pour la case à cocher ici */}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* Image/avatar ici */}
                                                            <span className="w-space-no">{user.id}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* Image/avatar ici */}
                                                            <span className="w-space-no">{user.firstname} {user.lastname}</span>
                                                        </div>
                                                    </td>
                                                    <td className={getSoldeColor(user.solde)}>{user.email}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* Image/avatar ici */}
                                                            <span className="w-space-no">{user.idBeneficiaire}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* Image/avatar ici */}
                                                            <span className="w-space-no">{user.solde}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <i className={`fa fa-circle ${getSoldeColor(user.solde)} mr-1`} />
                                                            {/* Status ici */}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <div className="d-flex">
                                                                <Link to={`/client/${user.email}`} className="btn btn-info shadow btn-xs sharp mr-2">
                                                                    <i className="fa fa-eye" />
                                                                </Link>
                                                                <Link to={`/edit/${user.id}`} className="btn btn-success shadow btn-xs sharp mr-2">
                                                                    <i className="fa fa-pencil" />
                                                                </Link>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp" onClick={() => deleteUser(user.id)}>
                                                                    <i className="fa fa-trash" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="d-flex">
                                                            {user.estValid ? (
                                                                <span className="text-success">
                                                                    <FontAwesomeIcon icon={faCheck} className="mr-1" />
                                                                    Client Valid
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-warning shadow btn"
                                                                    onClick={() => activateUser(user.id)}
                                                                >
                                                                    Valider
                                                                </button>
                                                            )}
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
        </div>

    )
}
