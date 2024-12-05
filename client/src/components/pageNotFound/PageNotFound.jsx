import { Link } from "react-router-dom";
import Path from "../../paths";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <div className="container-xxl py-5 wow animated flipInX mt-5" data-wow-delay="0.1s">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <i className="bi bi-exclamation-triangle-fill display-1  animated shake text-danger"></i>
                        <h1 className="display-1">404</h1>
                        <h1 className="mb-4">Page Not Found</h1>
                        <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                        <div className={`team-item ${styles.btnDiv}`}>
                            <Link to={Path.Home} className={`btn btn-primary rounded-pill py-3 px-5`}>Go Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PageNotFound;