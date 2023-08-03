import React, { useEffect, useState } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { DateTime } from 'luxon';
import { getEvents } from 'services/events/endpoints';
import LineChart from '../dashboards/LineChart';
import Modal from '../UI/Modal';
import 'react-tabs/style/react-tabs.css';

const HistoryModal = ({
  isOpen,
  onClose,
  metric,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents({
        type: 'MetricProgress',
        metricId: metric.id,
      })
      .then(res => setEvents(res.events));
  }, [metric]);

  const eventsToGraphPoints = events
    .sort((e1, e2) => e1.createdAt - e2.createdAt)
    .map(e => ({
      x: e.createdAt,
      y: e.progress,
    }));
  const today = DateTime.fromJSDate(new Date());
  const lastProgressEventTs = eventsToGraphPoints.length && eventsToGraphPoints[eventsToGraphPoints.length - 1].x;
  const lastProgressEventDate = lastProgressEventTs && DateTime.fromJSDate(new Date(lastProgressEventTs));
  const timeSinceLastProgressEvent = lastProgressEventDate && today.diff(lastProgressEventDate, 'days').days;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        title={ metric && metric.description }
      >
        <form
          id="MetricProgress_form"
          className="formulaire"
        >
          <Tabs>
            <TabList>
              <Tab>Historique</Tab>
              <Tab>Activités</Tab>
            </TabList>
            <TabPanel>
              <h5>Historique</h5>
              <table>
                <tbody>
                  <tr>
                    <td
                      width='60%'
                      style={{
                        verticalAlign: 'top',
                      }}
                    >
                      <div>
                        <b>Dernière mise à jour</b>
                        <br />
                        Il y a { timeSinceLastProgressEvent ? Math.round(timeSinceLastProgressEvent) : '-' } jours
                      </div>
                    </td>
                    <td>
                      <div style={{ width: 800 }}>
                        <LineChart
                          data={eventsToGraphPoints}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
            <TabPanel>
              <h5>Activités</h5>
            </TabPanel>
          </Tabs>
        </form>
      </Modal>
    </div>
  );
}

export default HistoryModal;
