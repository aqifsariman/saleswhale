import styles from './SideBar.module.css';
import whale from '../../assets/sw-logo-white.svg';
import iconCampaign from '../../assets/icon-campaign.svg';
import iconTeams from '../../assets/icon-teams.svg';
import iconLeads from '../../assets/icon-leads.svg';
import iconReports from '../../assets/icon-reports.svg';

const SideBar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={whale} alt="Whale" className={styles.whale} />
      <div className={styles['menu-campaigns']}>
        <img src={iconCampaign} alt="icon campaign" />
        <img src={iconTeams} alt="icon teams" />
        <img src={iconLeads} alt="icon leads" />
        <img src={iconReports} alt="icon reports" />
      </div>
    </nav>
  );
};

export default SideBar;
