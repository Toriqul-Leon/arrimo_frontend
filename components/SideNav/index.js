import styles from './SideNav.module.css';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function SideNav() {

    const { display, toggleDisplay } = useContext(GlobalContext);

    const toggle = (display) => {
        toggleDisplay(display);
    }

    return (
        <div className={styles.nav}>
            <div onClick={() => toggle("users")} className={`${styles.navItem} ${display === "users" ? styles.active : null}`}>
              <UserOutlined /> 
              <h3>Users</h3>
            </div>

            <div onClick={() => toggle("calender")} className={`${styles.navItem} ${display !== "users" ? styles.active : null}`} >
              <CalendarOutlined />
              <h3>Calender</h3>
            </div>
        </div>
    );
    }