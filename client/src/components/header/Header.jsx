import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";
import styles from './Header.module.css';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    const {
        isAuthenticated,
        email,
        name,
        phone,
    } = useContext(AuthContext);

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <Link to={Path.Home} className="navbar-brand p-0">
                <h2 className="text-primary m-0"><img src="img/logo.png" alt="Logo" style={{height: '35px'}} />Crystal Blog</h2>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <Link to={Path.Home} className="nav-item nav-link">Home</Link>
                    <Link to={Path.Crystals} className="nav-item nav-link">Crystals</Link>
                    {isAuthenticated && (
                    <Link to={Path.CrystalsCreate} className="nav-item nav-link">Publish crystal</Link>
                )}
                    <Link to={Path.Search} className="nav-item nav-link">Search</Link>
                    <Link to={Path.Contact} className="nav-item nav-link">Contact</Link>
                    <Link to={Path.About} className="nav-item nav-link">About Us</Link>
                    {isAuthenticated && (
                    <Link to={Path.MyProfile} className="nav-item nav-link"><FontAwesomeIcon icon={faUser} /> My Profile</Link>
                    )}
                </div>
                    {/* <span className={styles.welcome}>Welcome {!isAuthenticated ? 'Guest' : email.split('@')[0]}</span> */}
                    {!isAuthenticated && (
                        <div className="guestButtons">
                            <Link to={Path.Register} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Register</Link>
                            <Link to={Path.Login} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Login</Link>
                        </div>
                    )}
                    {isAuthenticated && (
                        <>
                        <span className={styles.welcome}>Welcome {email}</span>
                        <Link to={Path.Logout} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Logout</Link>
                        </>
                    )}
            </div>
        </nav>
          </div>
    );
};

export default Header;
