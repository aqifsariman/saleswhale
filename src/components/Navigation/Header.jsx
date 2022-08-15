import styles from './Header.module.css';
import { Fragment, createContext, useState } from 'react';
import companyIcon from '../../assets/icon-companies.svg';
import createTeam from '../../assets/button - create new team.svg';
import search from '../../assets/icon-search.svg';
import Teams from '../Tabs/Teams';

export const TabContext = createContext();

const Header = () => {
  const [tabChosen, setTabChosen] = useState('ALL');
  const [allClicked, setAllClicked] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false);
  const [archiveClicked, setArchiveClicked] = useState(false);
  const allHandler = (event) => {
    event.preventDefault();
    setTabChosen('ALL');
    setAllClicked(true);
    setFavoriteClicked(false);
    setArchiveClicked(false);
  };
  const favoritesHandler = (event) => {
    event.preventDefault();
    setTabChosen('FAVORITES');
    setAllClicked(false);
    setFavoriteClicked(true);
    setArchiveClicked(false);
  };
  const archivedHandler = (event) => {
    event.preventDefault();
    setTabChosen('ARCHIVED');
    setAllClicked(false);
    setFavoriteClicked(false);
    setArchiveClicked(true);
  };
  return (
    <Fragment>
      <div className={styles['top-container']}>
        <div className={styles.title}>
          <img src={companyIcon} alt="Company icon" />
          <header>Teams</header>
        </div>
        <img
          src={createTeam}
          alt="Create team"
          className={styles['top-container-right']}
        />
      </div>
      <div className={styles['bottom-container']}>
        <div className={styles['bottom-left-container']}>
          <button
            onClick={allHandler}
            className={allClicked ? styles.activated : ''}
          >
            All
          </button>
          <button
            onClick={favoritesHandler}
            className={favoriteClicked ? styles.activated : ''}
          >
            Favorites
          </button>
          <button
            onClick={archivedHandler}
            className={archiveClicked ? styles.activated : ''}
          >
            Archived
          </button>
        </div>
        <div className={styles['bottom-right-container']}>
          <img src={search} alt="search" />
          <input placeholder="Search team name ... " />
        </div>
      </div>
      <TabContext.Provider value={tabChosen}>
        <Teams />
      </TabContext.Provider>
    </Fragment>
  );
};

export default Header;
