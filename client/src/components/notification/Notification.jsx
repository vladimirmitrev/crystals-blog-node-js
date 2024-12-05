import { useContext } from 'react';

import styles from'./Notification.module.css';
import { NotificationContext } from '../../contexts/NotificationContext';


const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    return (
        <div className={`${styles.notification} ${styles[notification.type]}`} onClick={ hideNotification }>
            <p className={styles.notificationMessage}>
                
                { notification.message }
                { notification.message !== ''
                    ? <span className={styles.notificationClose}>&#10799;</span>
                    : '' }
            </p>
        </div>
    );
}

export default Notification;