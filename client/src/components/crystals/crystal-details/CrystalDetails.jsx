import { useEffect,  useContext, useState } from "react";
// import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CrystalComments from "./comments/CrystalComments";
import { pathToUrl } from "../../../utils/pathUtils";
import AuthContext from "../../../contexts/authContext";
import Path from "../../../paths";
import * as crystalService from '../../../services/crystalService';

import styles from './CrystalDetails.module.css';
import { faPalette, faGem, faShapes, faMagic, faMapMarked, faSpa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationContext, types } from '../../../contexts/NotificationContext';
import CrystalLikes from "./crystal-likes/CrystalLikes";
import CrystalDeleteModal from "./confirm-delete-modal/CrystalDeleteModal";

const CrystalDetails = () => {
    const navigate = useNavigate();
    const { email, userId } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const { crystalId } = useParams();
    const [crystal, setCrystal] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    useEffect(() => {
        const fetchCrystalDetails = async () => {
            setLoading(true);
            try {
                const response = await crystalService.getOne(crystalId);
                const crystalRes = response.data.crystal;
                if (crystalRes) {
                    setCrystal(crystalRes);                    
                } else {
                    console.error('Invalid API response:', response.data);
                }
                // setAllCrystals(response.data.crystals);
            } catch (error) {
                console.error('Error fetching crystal:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCrystalDetails();          
    }, [crystalId]);

    const confirmDeleteHandler = async () => {
            try {
                await crystalService.remove(crystalId);

                showNotification('You successfully delete a crystal!', types.success);
                navigate(Path.Crystals);
            } catch (err) {
                showNotification(err.message, types.error);
            } 
        }

  return (
    <>
    {showDelete && (
        <CrystalDeleteModal 
        onClose={handleClose}
        onDelete={confirmDeleteHandler}
        show={showDelete}
        name={crystal.name}
        />
    )}
    <div className={`col-lg-4 col-md-6 wow zoomIn animated ${styles.detailsCard}`} data-wow-delay="0.1s">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3 mt-4">Crystal Details</h6>
        </div>
        <div className="package-item mt-3">
            <div className="overflow-hidden text-center">
                <img className={`img-fluid ${styles.cardImage}`} src={crystal.imageUrl} alt="Crystal Image" />
            </div>
            <div className={styles.nameAndLikes}>
                <h3 className="text-center ml-3 mt-1 mb-1 ms-3 px-2">{crystal.name}</h3>
                    <p className="text-dark">Added by: <span className="text-primary">{crystal.owner?.name ? crystal.owner.name : 'Unknown'}</span> </p>
                <CrystalLikes key={crystalId} { ...crystal}/>
            </div>
            <div className="border-top p-4 mt-2">
                <h5><FontAwesomeIcon icon={faPalette} /> Colors</h5>
                <p>{crystal.color}</p>
                <h5><FontAwesomeIcon icon={faGem} /> Rarity</h5>
                <p>{crystal.rarity}</p>
                <h5><FontAwesomeIcon icon={faShapes} /> Appearance</h5>
                <p>{crystal.appearance}</p>
                <h5><FontAwesomeIcon icon={faSpa} /> Healing powers</h5>
                <p>
                {crystal.healing}
                </p>
                <h5><FontAwesomeIcon icon={faMapMarked} /> Countries where can be found</h5>
                <p>{crystal.source}</p>

                <CrystalComments />
                <div className="d-flex justify-content-center mt-5 mb-2 gap-3">
                    <div className={`team-item ${styles.btnDiv}`}>
                    <Link to={Path.Crystals} className="btn btn-primary rounded-pill px-3 mt-2 mt-2 ml-3">Go back to catalog</Link>
                    </div>
                { userId == crystal.owner?._id && (
                    <div className="buttons d-flex gap-3">
                        <Link to={pathToUrl(Path.CrystalEdit, { crystalId})} className="btn details-btn btn-warning rounded-pill px-3 mt-2 mt-2 ml-3">Edit Crystal</Link>
                        <button className="btn btn-danger rounded-pill px-3 mt-2 ml-3" onClick={handleShow} >Delete Crystal</button>
                    </div>
                )}
                </div>
            </div>
        </div>
          </div>
    </>
  );
};

export default CrystalDetails;
