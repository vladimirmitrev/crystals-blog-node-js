import { useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/authContext";
import { NotificationContext, types } from "../../contexts/NotificationContext";
import * as crystalService from "../../services/crystalService";

import CrystalCatalogItem from "../crystals/catalog/CrystalCatalogItem/CrystalCatalogItem";
import Loading from "../loading/Loading";

import styles from './UserProfile.module.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = () => {
    const { email, userId, name, phone } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const [crystals, setCrystals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        crystalService
        .getByOwnerId(userId)
            .then(result => {
                setCrystals(result);
                setLoading(false);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [userId, showNotification]);

    return (
        <div className={`container ${styles.myProfileDiv}`}>
            <h6 className="mt-2">My Profile</h6>
            <div className={`team-item ${styles.profileInfo}`}>
                <p><FontAwesomeIcon icon={faUser} /></p>
                <p>Name: <span>{name}</span></p>
                <p>Email: <span>{email}</span></p>
                <p>Phone: <span>+359{phone ? phone : 888123456}</span></p>
            </div>
            <h4>Crystals added by me</h4>
            <div className={styles.userCrystalItems}>
            {loading ? (
                <Loading />
          ) : crystals.length ? (
        <div className={`row g-4 mt-3 text-center ${styles.catalog}`}>
            {crystals.map(crystal => (
                <CrystalCatalogItem key={crystal._id} {...crystal}/>
            ))}
        </div>
          ) : (
            <div>
            <p className="h2 text-danger text-center">
              Sorry there are no added crystals yet
            </p>
            <p className="h2 text-danger text-center">:\</p>
          </div>
        )}
            </div>
        </div>
    )
}

export default UserProfile;