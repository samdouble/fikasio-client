import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { getProjectEvents } from 'services/projects/endpoints';
import { Event } from 'services/events/types';
import { Project } from 'services/projects/types';

interface ProjectHistoryProps {
  project: Project;
}

const ProjectHistory = ({
  project,
}: ProjectHistoryProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getProjectEvents(project.id)
      .then(res => setEvents(res.events));
  }, []);

  return (
    <Table>
      <tbody>
        {
          events
            .sort((eventA, eventB) => (eventB.createdAt < eventA.createdAt ? -1 : 1))
            .map(event => (
              <tr key={event.id}>
                <td width={150}>{DateTime.fromISO(event.createdAt).toRelative()}</td>
                <td width={100}>{event.eventType}</td>
                <td>{JSON.stringify(event)}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};

export default ProjectHistory;
