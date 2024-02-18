import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { getTaskEvents } from 'services/tasks/endpoints';
import { Event } from 'services/events/types';
import { Task } from 'services/tasks/types';

interface TaskHistoryProps {
  task: Task;
}

const TaskHistory = ({
  task,
}: TaskHistoryProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getTaskEvents(task.id)
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

export default TaskHistory;
