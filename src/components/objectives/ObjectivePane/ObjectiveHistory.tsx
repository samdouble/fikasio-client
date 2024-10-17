import React from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { useGetEventsForObjectiveQuery } from 'services/events/api';
import { Objective } from 'services/objectives/types';

interface ObjectiveHistoryProps {
  objective: Objective;
}

const ObjectiveHistory = ({
  objective,
}: ObjectiveHistoryProps) => {
  const { data: events } = useGetEventsForObjectiveQuery(objective.id);

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

export default ObjectiveHistory;
