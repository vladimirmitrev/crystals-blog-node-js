import { useContext, useState } from 'react';
import AuthContext from '../../../contexts/authContext';
import { Link } from 'react-router-dom';
import Path from '../../../paths';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { faUserCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
  const { registerSubmitHandler } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim('The name cannot include leading and trailing spaces')
        .min(6, 'Name should be at least 6 characters')
        .max(30, 'Name should be no longer than 30 characters')
        .required('Name is required'),
      email: Yup.string().email('Invalid email address')
        .min(4, 'Email should be at least 4 characters')
        .max(30, 'Email should be no longer than 30 characters')
        .required('Email is required'),
      phone: Yup.string().required('Phone is required').matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{2}[-\s.]?[0-9]{4,7}$/im, 'Must be valid phone number'),
      // phone: Yup.number().required('Phone is required'),
      password: Yup.string()
        .trim()
        .min(6, 'Password should be at least 6 characters')
        .max(32, 'Password should be no longer than 30 characters').required('Password is required'),
      confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required')
    }),
    onSubmit: (values) => {
      registerSubmitHandler(values);
    },
  });
  return (
    <div
      className={`col-lg-4 col-md-12 wow animated slideInLeft ${styles.registerForm}`}
      data-wow-delay="2s"
    >
      <form onSubmit={formik.handleSubmit}>
        <h1 className='text-center'>Register <FontAwesomeIcon icon={faUserCheck}/></h1>
        <div className="row g-3">
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label htmlFor="name">Your Name</label>
              {formik.touched.name && formik.errors.name ? (
                <p className={styles.inputError}>{formik.errors.name}</p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className={styles.inputError}>{formik.errors.email}</p>
              ) : null}
              <label htmlFor="email">Your Email</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="phone"
                placeholder="Your phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className={styles.inputError}>{formik.errors.phone}</p>
              ) : null}
              <label htmlFor="phone">Your Phone</label>
            </div>
          </div>
          <div className="col-12">
          <div className={`form-floating ${styles.passwordInput}`}>
              <input
                type={visible ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
               {formik.values.password && (
                    <div className={styles.eyeIcon}
                    onClick={() => setVisible(!visible)}>
                    {visible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </div>
                )}
              {formik.touched.password && formik.errors.password ? (
                <p className={styles.inputError}>{formik.errors.password}</p>
              ) : null}
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="col-12">
          <div className={`form-floating ${styles.passwordInput}`}>
              <input
                type={visible ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
               {formik.values.confirmPassword && (
                    <div className={styles.eyeIcon}
                    onClick={() => setVisible(!visible)}>
                    {visible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </div>
                )}
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className={styles.inputError}>{formik.errors.confirmPassword}</p>
              ) : null}
              <label htmlFor="confirmPassword">Confirm password</label>
            </div>
          </div>
          <div className="col-12">
            <button className={`btn btn-primary w-100 py-3 ${styles.regBtn}`} type="submit">
              Register
            </button>
          </div>
          <div className="col-12 d-flex">
            <span style={{ color: 'black' }}>
              You already have an account?{' '}
              <Link to={Path.Login} className={`${styles.loginLink}`}>
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
