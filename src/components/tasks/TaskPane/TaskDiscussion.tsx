import React, { useState, useEffect } from 'react';
import { AutosaveTextarea } from '@fikasio/react-ui-components';
import { usePatchActivityMutation } from 'services/activities/api';
import { getTaskComments } from 'services/tasks/endpoints';
import { Task } from 'services/tasks/types';

interface TaskDiscussionProps {
  task: Task;
}

const TaskDiscussion = ({
  task,
}: TaskDiscussionProps) => {
  const [comments, setComments] = useState([]);

  const [patchActivity] = usePatchActivityMutation();

  useEffect(() => {
    getTaskComments(task.id)
      .then(res => setComments(res.comments));
  }, []);

  return (
    <>
      <AutosaveTextarea
        className="form-control"
        onSave={async () => {
          /*patchActivity({
            id: activity.id,
            comments: value,
          })(dispatch);*/
        }}
        style={{
          paddingLeft: 5,
          paddingRight: 50,
          paddingTop: 0,
          width: '100%',
        }}
        useContentEditableDiv
      />
      {
        comments
          .map(comment => (
            <div>
              { comment }
            </div>
          ))
      }
    </>
  );
};

export default TaskDiscussion;
