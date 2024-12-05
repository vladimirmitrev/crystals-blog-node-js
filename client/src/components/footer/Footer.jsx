import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';


import styles from './Footer.module.css';
import Path from '../../paths';


const Footer = () => {

    return (
        <footer className={`container bg-dark text-light footer fixed-bottom container ${styles.footerCss}`}>
                <div className="copyright text-center">
                    <div className='my-2'>
                        <span> &copy; <Link className="border-bottom" to={Path.Home}>Crystal Blog by Vladimir Mitrev 2024</Link>
                        </span>
                    </div>
                    <div className='text-center container my-1'>
                        <a href='https://twitter.com' target='_blank' className='btn-social mx-2' ><FontAwesomeIcon icon={faTwitter}/></a>
                        <a href='https://facebook.com' target='_blank' className='btn-social mx-2' ><FontAwesomeIcon icon={faFacebookSquare}/></a>
                        <a href='https://instagram.com' target='_blank' className='btn-social mx-2' ><FontAwesomeIcon icon={faInstagram}/></a>
                        <a href='https://pinterest.com' target='_blank' className='btn-social mx-2' ><FontAwesomeIcon icon={faPinterest}/></a>
                        <a href='https://google.com' target='_blank' className='btn-social mx-2' ><FontAwesomeIcon icon={faGoogle}/></a>
                    </div>
                </div>
        </footer>


    );

};

export default Footer;