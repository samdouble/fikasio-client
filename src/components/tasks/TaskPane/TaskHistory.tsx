import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { useLazyGetTaskEventsQuery } from 'services/tasks/api';
import { Event } from 'services/events/types';
import { Task } from 'services/tasks/types';

interface TaskHistoryProps {
  task: Task;
}

const TaskHistory = ({
  task,
}: TaskHistoryProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  const [getTaskEvents] = useLazyGetTaskEventsQuery();

  useEffect(() => {
    if (task.id) {
      getTaskEvents(task.id)
        .then(({ data }) => {
          if (data) {
            setEvents(data);
          }
        });
    }
  }, []);

  return (
    <Table>
      <tbody>
        {
          [...(events || [])]
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
