import {Link} from 'react-router-dom';
import styles from './CrystalCatalogItem.module.css';
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Path from '../../../../paths';
import { pathToUrl } from '../../../../utils/pathUtils';
const CrystalCatalogItem = ({
    _id,
    name, 
    imageUrl, 
    rarity, 
}) => {
    return (
        <div className="col-lg-3 col-md-6 wow slideInRight animated" data-wow-delay="0.1s">
            <div className="team-item">
                <div className="overflow-hidden">
                    <img className={`img-fluid ${styles.cardImage}`} src={imageUrl} alt="crystal-image" />
                </div>
                {/* <div className="position-relative d-flex justify-content-center" style={{marginTop: '-19px'}}>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                </div> */}
                <div className="text-center">
                    <h5 className="mb-0">{name}</h5>
                    <small><FontAwesomeIcon icon={faGem} /> Rarity: {rarity.length > 32 ? `${rarity.slice(0, 32)}...` : rarity}</small>
                </div>
                <Link to={pathToUrl(Path.CrystalDetails, {crystalId: _id})} 
                    className="btn details-btn btn-primary rounded-5 mt-2 mb-3">More details
                </Link>
            </div>
        </div>
    );
}

export default CrystalCatalogItem;