import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as crystalService from '../../services/crystalService';
import { NotificationContext, types } from '../../contexts/NotificationContext';
import styles from './Search.module.css';

import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import CrystalCatalogItem from '../crystals/catalog/CrystalCatalogItem/CrystalCatalogItem';

const Search = () => {
    const [allCrystals, setAllCrystals] = useState([]);
    const { showNotification } = useContext(NotificationContext);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        crystalService.getAll()
            .then(result => {
                setAllCrystals(result);
                setLoading(false);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
        
    }, [showNotification]);

    const formik = useFormik({
        initialValues: {
          name: '',
          healing: '',
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .trim()
            .min(1, 'Search by name should be at least 1 character')
            .max(32, 'Search by name should be no longer than 32 characters'),
            // .required('Search by name should be at least 1 character'),
          healing: Yup.string()
            .trim()
            .min(1, 'Healing should be at least 1 characters')
            .max(32, 'Healing should be no longer than 30 characters')
            // .required('Healing is required'),
        }),
        onSubmit: async (values) => {
            const name = values.name;
            const healing = values.healing;
            let result;

            try {
                name ? result =  await crystalService.searchByName(name) : result =  await crystalService.searchByHealing(healing);
                setAllCrystals(result);
            } catch (err) {
                // showNotification(err.message, types.error);
            }
        },
      });
      
        const indexOfLastCrystal = currentPage * pageSize;
        const indexOfFirstCrystal = indexOfLastCrystal - pageSize;
        const currentCrystals = allCrystals.slice(indexOfFirstCrystal, indexOfLastCrystal);

        const totalPages = Math.ceil(allCrystals.length / pageSize);

        const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
    };
    return (
            <div className="container-fluid row justify-content-center">
                <div className="col-lg-10 pt-lg-4 mt-lg-4 text-center">
                    <h6 className="section-title bg-white text-center text-primary px-3 mt-4">Search</h6>
                    <h2 className="mb-3 mt-3 animated slideInDown">Search for a crystals <FontAwesomeIcon icon={faGem} /> by name or by healing abilities</h2>
                    <div className="w-75 mx-auto pt-3 animated slideInDown">
                        <form onSubmit={formik.handleSubmit} className={`d-flex gap-3 ${styles.searchForm}`}>
                            <div className='d-flex flex-column col-lg-4'>
                                <input 
                                className="form-control rounded-pill border-3" 
                                type="text" 
                                placeholder="Eg: Amethyst"
                                name="name"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.name}
                                />
                                {formik.errors.name ? (
                                <p className={styles.inputError}>{formik.errors.name}</p>
                                ) : null}
                            </div>
                            <div className='d-flex flex-column col-lg-4'>
                            <input 
                            className="form-control rounded-pill border-3" 
                            type="text" 
                            placeholder="Eg: headache"
                            name="healing"
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.healing}
                            />
                            {formik.errors.healing ? (
                            <p className={styles.inputError}>{formik.errors.healing}</p>
                            ) : null}
                            </div>
                            <div className='col-lg-2'>
                            <button type="submit" className="btn btn-primary rounded-pill px-5 border-3">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.userCrystalItems}>
                {loading ? (
                    <Loading />
                ) : currentCrystals.length ? (
                    <div className={`row g-4 mt-3 text-center ${styles.catalog}`}>
                        {currentCrystals.map(crystal => (
                            <CrystalCatalogItem key={crystal._id} {...crystal} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="h2 text-danger text-center mt-3">
                            Sorry there are no crystals matching this search
                        </p>
                        <p className="h2 text-danger text-center">:\</p>
                        <p className="h2 text-danger text-center">Try another word</p>
                    </div>
                )}
                {!loading && totalPages > 1 && (
                    <div className={`pagination animated zoomIn ${styles.pagination}`}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`btn rounded-pill ${currentPage === pageNumber ? 'btn-info' : 'btn-primary'}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            </div>
    )
};
export default Search;