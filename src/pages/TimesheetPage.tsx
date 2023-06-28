import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import ActivitiesView from 'components/activities/ActivitiesView';
import { calculateFilledTime } from 'components/activities/utils';
import BasePage from 'components/UI/BasePage';
import ResourcesHandler from 'components/ResourcesHandler';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import { round } from 'utils/maths';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.scss';

const TimesheetPage = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.activities);
  const [date, setDate] = useState(DateTime.now());

  const startTs = date.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  }).toISO();
  const endTs = date.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  }).toISO();

  useEffect(() => {
    dispatch(operations.activities.fetchActivities({
      startTime: startTs,
      endTime: endTs,
    }));
  }, [startTs, endTs]);

  const resFilledTime = activities && calculateFilledTime(activities, startTs, endTs);
  const filledTime = resFilledTime ? resFilledTime.filledTime : 0;
  const unfilledTime = resFilledTime ? resFilledTime.unfilledTime : 0;

  const activitiesToExport = (activities || [])
    .filter(activity => (
      DateTime.fromISO(activity.startTime) <= DateTime.fromISO(endTs)
      && DateTime.fromISO(activity.endTime) > DateTime.fromISO(startTs)
    ));

  const CSVHeaders = [
    'Commentaires',
    'Début',
    'Fin',
  ];
  const CSVData = activitiesToExport.map(activityToShow => ([
    activityToShow.comments,
    activityToShow.startTime,
    activityToShow.endTime,
  ]));

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: links.paths.home }}
        >
          Accueil
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Feuille de temps</Breadcrumb.Item>
      </Breadcrumb>
      <Link to={links.paths.templates}>
        <Button
          variant="light"
          style={{
            float: 'right',
          }}
        >
          Modèles
        </Button>
      </Link>
      <CSVLink
        data={CSVData}
        filename={`export_${date.toFormat('yyyy-MM-dd')}.csv`}
        headers={CSVHeaders}
      >
        <Button
          variant="light"
          style={{
            float: 'right',
          }}
        >
          <FontAwesomeIcon
            icon="download"
            size="1x"
          />
        </Button>
      </CSVLink>
      <h4>
        Feuille de temps
        &nbsp;
        <span
          onClick={() => { setDate(date.minus({ days: 1 })); }}
          style={{
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon
            icon="caret-left"
            size="1x"
            style={{
              cursor: 'pointer',
            }}
          />
          &nbsp;
        </span>
        &nbsp;
        { date.toFormat('yyyy-MM-dd') }
        &nbsp;
        <span
          onClick={() => { setDate(date.plus({ days: 1 })); }}
          style={{
            cursor: 'pointer',
          }}
        >
          &nbsp;
          <FontAwesomeIcon
            icon="caret-right"
            size="1x"
            style={{
              cursor: 'pointer',
            }}
          />
        </span>
      </h4>
      <table>
        <tbody>
          <tr>
            <td>
              <b>Pourcentage du temps spécifié</b>
            </td>
            <td>
              {
                (filledTime + unfilledTime !== 0)
                  ? `${round((filledTime / (filledTime + unfilledTime)) * 100, 1)}%`
                  : '0%'
              }
            </td>
          </tr>
        </tbody>
      </table>
      <ActivitiesView
        activities={activities}
        date={date}
        onActivitySelect={activity => dispatch(
          operations.pane.setPaneContent({
            type: 'ACTIVITY',
            activity,
          })
        )}
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[]}
      resourceFetchers={[]}
      getContents={getPage}
    />
  );
};

export default TimesheetPage;
