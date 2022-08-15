/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import styles from './Teams.module.css';
import { Fragment, useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import activeStar from '../../assets/star active.svg';
import defaultStar from '../../assets/star.svg';
import convoIcon from '../../assets/icon-conversations-small.svg';
import leadsIcon from '../../assets/icon-leads-small.svg';
import { TabContext } from '../Navigation/Header';

const Teams = (props) => {
  const [teams, setTeams] = useState([]);
  const [activities, setActivities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [archived, setArchived] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const effectRan = useRef(false);
  const tabChosen = useContext(TabContext);

  useEffect(() => {
    if (effectRan.current === false) {
      axios
        .get(
          'https://second-project-3c04b-default-rtdb.asia-southeast1.firebasedatabase.app/teams.json'
        )
        .then((response) => {
          console.log(response.data.length);
          setTotalResults(response.data.length);
          response.data.map((teamInfo) => {
            setTeams((oldArray) => [...oldArray, teamInfo]);
            console.log(teamInfo);
            if (teamInfo.is_favorited === true) {
              setFavorites((oldArr) => [...oldArr, teamInfo]);
            }
            if (teamInfo.is_archived === true) {
              setArchived((oldArr) => [...oldArr, teamInfo]);
            }
          });
        });
      axios
        .get(
          'https://second-project-3c04b-default-rtdb.asia-southeast1.firebasedatabase.app/activities.json'
        )
        .then((response) => {
          console.log(response.data);
          response.data.map((teamInfo) => {
            setActivities((oldArray) => [...oldArray, teamInfo]);
          });
        });
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <Fragment>
      <div className={styles['main-container']}>
        <div className={styles['left-container']}>
          <div className={styles['left-top-container']}>
            <header>All Teams</header>
            {tabChosen === 'ALL' && (
              <p>
                Showing {totalResults} out of {totalResults} teams
              </p>
            )}
            {tabChosen === 'FAVORITES' && (
              <p>
                Showing {favorites.length} out of {totalResults} teams
              </p>
            )}
            {tabChosen === 'ARCHIVED' && (
              <p>
                Showing {archived.length} out of {totalResults} teams
              </p>
            )}
          </div>
          <div className={styles.teams}>
            {tabChosen === 'ALL' &&
              teams.map((team) => {
                return (
                  <div className={styles.team}>
                    <>
                      <div className={styles['top-portion']}>
                        <img src={team.image} alt={`${team.name}`} />
                        <div>
                          <header>{team.name}</header>
                          {!team.created_at ? (
                            <p>Archived on 28 October 2017</p>
                          ) : (
                            <p>Created on {team.created_at}</p>
                          )}
                        </div>
                        {team.is_favorited ? (
                          <img
                            src={activeStar}
                            alt="favorite"
                            className={styles.star}
                          />
                        ) : (
                          <img
                            src={defaultStar}
                            alt="favorite"
                            className={styles.star}
                          />
                        )}
                      </div>
                      <div className={styles['mid-portion']}>
                        <p>{team.description}</p>
                      </div>
                      <div className={styles['bottom-portion']}>
                        <img src={convoIcon} alt="convo" />
                        <p>{team.campaigns_count} Campaigns</p>
                        <img src={leadsIcon} alt="leads" />
                        <p>{team.leads_count} Leads</p>
                      </div>
                    </>
                  </div>
                );
              })}
            {tabChosen === 'FAVORITES' &&
              favorites.map((favorite) => {
                return (
                  <div className={styles.team}>
                    <>
                      <div className={styles['top-portion']}>
                        <img src={favorite.image} alt={`${favorite.name}`} />
                        <div>
                          <header>{favorite.name}</header>
                          {!favorite.created_at ? (
                            <p>Archived on 28 October 2017</p>
                          ) : (
                            <p>Created on {favorite.created_at}</p>
                          )}
                        </div>
                        <img
                          src={activeStar}
                          alt="favorite"
                          className={styles.star}
                        />
                      </div>
                      <div className={styles['mid-portion']}>
                        <p>{favorite.description}</p>
                      </div>
                      <div className={styles['bottom-portion']}>
                        <img src={convoIcon} alt="convo" />
                        <p>{favorite.campaigns_count} Campaigns</p>
                        <img src={leadsIcon} alt="leads" />
                        <p>{favorite.leads_count} Leads</p>
                      </div>
                    </>
                  </div>
                );
              })}
            {tabChosen === 'ARCHIVED' &&
              archived.map((archive) => {
                return (
                  <div className={styles.team}>
                    <>
                      <div className={styles['top-portion']}>
                        <img src={archive.image} alt={`${archive.name}`} />
                        <div>
                          <header>{archive.name}</header>
                          {!archive.created_at ? (
                            <p>Archived on 28 October 2017</p>
                          ) : (
                            <p>Created on {archive.created_at}</p>
                          )}
                        </div>
                        {archive.is_favorited ? (
                          <img
                            src={activeStar}
                            alt="favorite"
                            className={styles.star}
                          />
                        ) : (
                          <img
                            src={defaultStar}
                            alt="favorite"
                            className={styles.star}
                          />
                        )}
                      </div>
                      <div className={styles['mid-portion']}>
                        <p>{archive.description}</p>
                      </div>
                      <div className={styles['bottom-portion']}>
                        <img src={convoIcon} alt="convo" />
                        <p>{archive.campaigns_count} Campaigns</p>
                        <img src={leadsIcon} alt="leads" />
                        <p>{archive.leads_count} Leads</p>
                      </div>
                    </>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles['right-container']}>
          <header>Activity</header>
          <div>
            {activities.map((activity) => {
              return (
                <div className={styles.activity}>
                  <img src={activity.person.avatar} alt="avatar" />
                  {activity.action === 'increased_quota' && (
                    <div>
                      <p className={styles.action}>
                        <strong>{activity.person.name}</strong> increased{' '}
                        <strong>{activity.target}</strong>
                        's quota.
                      </p>
                      <p className={styles.created}>{activity.created_at}</p>
                    </div>
                  )}
                  {activity.action === 'added_leads' && (
                    <div>
                      <p className={styles.action}>
                        <strong>{activity.person.name}</strong> added new leads
                        to <strong>{activity.target}</strong>.
                      </p>
                      <p className={styles.created}>{activity.created_at}</p>
                    </div>
                  )}
                  {activity.action === 'archived_team' && (
                    <div>
                      <p className={styles.action}>
                        <strong>{activity.person.name}</strong> archived the
                        team <strong>{activity.target} </strong>.
                      </p>
                      <p className={styles.created}>6 hours ago</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Teams;
