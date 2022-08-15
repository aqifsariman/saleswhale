import { Fragment, useRef } from 'react';
import styles from './Account.module.css';
import photo from '../../assets/Headshot.jpg';
import menu from '../../assets/menu-notification.svg';
import caretDown from '../../assets/caret-down.svg';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Account = () => {
  const isLoaded = useRef(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isLoaded.current === false) {
      axios
        .get(
          'https://second-project-3c04b-default-rtdb.asia-southeast1.firebasedatabase.app/current-user.json'
        )
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        });
    }
    return () => {
      isLoaded.current = true;
    };
  }, []);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles['proxima-nova']}>NARWHAL</p>
        </div>
        <div className={styles.right}>
          <p className={styles['proxima-nova']}>Teams</p>
          <div className={styles.notifications}>
            <img
              src={menu}
              alt="menu notification"
              className={styles['menu-notification']}
            />
            <p>Hello, {user.name}</p>
            <img src={user.avatar} alt="Avatar" className={styles.avatar} />
            <img src={caretDown} alt="Caret Down" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;
