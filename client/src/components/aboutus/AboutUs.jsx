import { Link } from 'react-router-dom';
import Path from '../../paths';
import styles from './AboutUs.module.css';

import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AboutUs = () => {
  return (
    <div className="container-xxl py-5 wow" data-wow-delay="0.1s">
      <div className={`container text-center ${styles.aboutUsText}`}>
            {/* <h3 className="mb-5 text-dark mt-3">
                Welcome to Crystal Blog!!!
            </h3> */}
            <h6 className="section-title bg-white text-center text-primary px-3 mt-4">
                Our Story
            </h6>
            <p className="animated slideInDown">
                Welcome to Crystal Blog, your go-to destination for all things
                crystals! We are passionate about sharing the enchanting world of
                crystals with a broader audience, helping more people discover and
                learn about their incredible properties, uses, and the mystical
                healing powers they possess.
            </p>
            <p className="animated slideInLeft">
                At Crystal Blog, we believe in the magic and energy that crystals
                bring into our lives. Whether you are a seasoned crystal enthusiast
                or just starting your journey, our blog is designed to provide you
                with valuable information, insights, and inspiration to enhance your
                understanding and appreciation of these natural wonders.
            </p>
            <p className="animated slideInRight">
                Through our blog, we aim to delve deeper into the magical world of
                crystals. We share their history, cultural significance, and
                practical uses in daily life. Our mission is to educate and inspire
                you to harness the healing energies of crystals and incorporate them
                into your wellness practices.
            </p>
            <div className="animated slideInUp">
                <p>
                    Join us on this magical journey as we explore the beauty, mystery,
                    and power of crystals. Together, we can unlock the secrets of these
                    extraordinary natural treasures and bring their magic into our
                    lives.
                </p>
                <p>
                    Thank you for visiting Crystal Blog. We are delighted to have you
                    here and look forward to sharing our love for crystals with you!
                </p>
                <p>Warm regards,</p>
                <p className={styles.lastP}>The Crystal Blog Team</p>
            </div>
            <div className='animated fadeInUp'>
                <Link to={Path.Crystals} className={styles.exploreLink}>Click Here To Explore Our Crystals <FontAwesomeIcon icon={faGem} /></Link>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
