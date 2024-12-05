import styles from './ContactUs.module.css';
import { faEnvelope, faMapMarked, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Weather from '../weather/Weather';

const ContactUs = () => {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3  mt-4">
              Contact Us
            </h6>
            <h3 className='mt-3 animated fadeInUp'>Find us on the map <FontAwesomeIcon icon={faMapMarked} /></h3>
          </div>
          <div className="row g-4 mt-3">
            <div className="col-lg-3 col-md-3 wow fadeInUp" data-wow-delay="0.1s">
              <h5>Get In Touch</h5>
              <p className="mb-4">
                Feel free to get in with contact us
              </p>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-secondary"
                  style={{ height: '50px', width: '50px' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} inverse/>
                </div>
                <div className="ms-3">
                  <h5 className="">Office</h5>
                  <p className="mb-0">Sofia Center, Vitosha Blvd 44, 1000 Sofia</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-secondary"
                  style={{ height: '50px', width: '50px' }}>
                  <FontAwesomeIcon icon={faPhoneAlt} inverse/>
                </div>
                <div className="ms-3">
                  <h5 className="">Mobile</h5>
                  <p className="mb-0">+359 888 123456</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-secondary"
                  style={{ height: '50px', width: '50px' }}>
                  <FontAwesomeIcon icon={faEnvelope} inverse/>
                </div>
                <div className="ms-3">
                  <h5 className="">Email</h5>
                  <p className="mb-0">info@crystal-blog.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 wow animated zoomIn"
              data-wow-delay="0.3s">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.1507144244055!2d23.31867166960763!3d42.690954198197744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8512dcf84a4b%3A0xf6be7685a7a42b0a!2sSofia%20Center%2C%20Vitosha%20Blvd%2044%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1722413966277!5m2!1sen!2sbg"
                className={`position-relative rounded w-100 h-100 ${styles.googleMap}`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-lg-3 col-md-4 wow fadeInUp"
              data-wow-delay="0.5s">
            <Weather />
            </div>
            {/* <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: '100px' }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
