import styles from '../compare/CompareCrystals.module.css'
import * as crystalService from '../../../services/crystalService';
import { useEffect, useState } from "react";


const CompareCrystals = () => {
    const [allCrystals, setAllCrystals] = useState([]);
    const [selectedCrystals, setSelectedCrystals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllCrystals = async () => {
            setLoading(true);
            try {
                const response = await crystalService.getAll();
                setAllCrystals(response);
            } catch (error) {
                console.error('Error fetching crystals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCrystals();
    }, []);

    const handleCheckboxChange = (crystal) => {
        setSelectedCrystals((prev) => {
            if (prev.includes(crystal)) {
                return prev.filter((item) => item !== crystal); // Remove if already selected
            } else {
                return [...prev, crystal]; // Add if not already selected
            }
        });
    };

    const handleSubmit = () => {
        if (selectedCrystals.length === 2) {
            console.log("Submitting:", selectedCrystals);
            // Add your submit logic here
        } else {
            alert("Please select exactly 2 crystals to compare.");
        }
    };
    
    return (
        <div
            className={`col-lg-4 col-md-6 wow zoomIn animated mt-5 ${styles.compareCard}`}
            data-wow-delay="0.1s"
        >
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3 mt-4">
                    Crystal Compare
                </h6>
            </div>
            <div className="package-item mt-3">
                <ul>
                    {allCrystals.map((crystal) => (
                        <li key={crystal.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={crystal.name}
                                    onChange={() => handleCheckboxChange(crystal)}
                                    checked={selectedCrystals.includes(crystal)}
                                />
                                {crystal.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={selectedCrystals.length !== 2} // Disable if not exactly 2 selected
                >
                    Compare
                </button>
            </div>
            <div className="comparedCrystals d-flex">
                <h6>Compared Crystals:</h6>
                {selectedCrystals.map((crystal, index) => (
                    <div key={index} className="compared-crystal d-flex flex-column">
                        <p>{crystal.name}</p>
                        <img className={`img-fluid ${styles.cardImage}`} src={crystal.imageUrl} width={400} alt="Crystal Image" />
                        <p>{crystal.color}</p>
                        <p>{crystal.healing}</p>
                        <p>{crystal.rarity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompareCrystals;