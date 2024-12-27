import React, { useState, useEffect } from 'react';
import { AutosaveTextarea } from '@fikasio/react-ui-components';
import { useLazyGetTaskCommentsQuery } from 'services/tasks/api';
import { Task } from 'services/tasks/types';

interface TaskDiscussionProps {
  task: Task;
}

const TaskDiscussion = ({
  task,
}: TaskDiscussionProps) => {
  const [comments, setComments] = useState<string[]>([]);
  const [getTaskComments] = useLazyGetTaskCommentsQuery();

  useEffect(() => {
    if (task.id) {
      getTaskComments(task.id)
        .then(({ data }) => {
          if (data) {
            setComments(data);
          }
        });
    }
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
