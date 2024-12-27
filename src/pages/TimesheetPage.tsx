import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Tooltip } from 'react-tooltip';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import ActivitiesView from 'components/activities/ActivitiesView';
import { calculateFilledTime } from 'components/activities/utils';
import BasePage from 'components/UI/BasePage';
import { useGetActivitiesQuery } from 'services/activities/api';
import { setPaneContent } from 'services/pane/slice';
import links from 'utils/links';
import { round } from 'utils/maths';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.scss';

const TimesheetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const searchParams = new URLSearchParams(search);
  const dateParam = searchParams.get('date');
  const date = dateParam
    ? DateTime.fromFormat(dateParam, 'yyyy-MM-dd')
    : DateTime.now();
  const { t } = useTranslation();

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

  const { data: activities, refetch } = useGetActivitiesQuery({
    filter: {
      startTime: startTs,
      endTime: endTs,
    },
  });

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [startTs, endTs]);

  const resFilledTime = activities && calculateFilledTime([...activities], startTs, endTs);
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

  return (
    <>
      <Helmet>
        <title>{t('timesheet')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: links.paths.home }}
          >
            {t('home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{t('timesheet')}</Breadcrumb.Item>
        </Breadcrumb>
        <Link to={links.paths.templates}>
          <Button
            style={{
              float: 'right',
            }}
            variant="light"
          >
            {t('templates')}
          </Button>
        </Link>
        <CSVLink
          data={CSVData}
          filename={`export_${date.toFormat('yyyy-MM-dd')}.csv`}
          headers={CSVHeaders}
        >
          <Button
            data-tooltip-content={t('exportToCsv')}
            data-tooltip-id="exportToCsv"
            style={{
              float: 'right',
            }}
            variant="light"
          >
            <FontAwesomeIcon
              icon="download"
              size="1x"
            />
          </Button>
          <Tooltip id="exportToCsv" />
        </CSVLink>
        <h4>
          {t('timesheet')}
          &nbsp;
          <span
            onClick={() => {
              const newDate = date.minus({ days: 1 });
              // setDate(newDate);
              navigate(links.timesheet({ date: newDate.toFormat('yyyy-MM-dd') }));
            }}
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
            onClick={() => {
              const newDate = date.plus({ days: 1 });
              // setDate(newDate);
              navigate(links.timesheet({ date: newDate.toFormat('yyyy-MM-dd') }));
            }}
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
          onActivityClick={activity => dispatch(
            setPaneContent({
              type: 'ACTIVITY',
              activity,
            })
          )}
        />
      </BasePage>
    </>
  );
};

export default TimesheetPage;
