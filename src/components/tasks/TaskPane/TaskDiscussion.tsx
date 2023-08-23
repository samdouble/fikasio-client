import React, { useState, useEffect } from 'react';
import AutosaveTextarea from 'components/UI/AutosaveTextarea';
import { getTaskComments } from 'services/tasks/endpoints';
import { Task } from 'services/tasks/types';

interface TaskDiscussionProps {
  task: Task;
}

const TaskDiscussion = ({
  task,
}: TaskDiscussionProps) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getTaskComments(task.id)
      .then(res => setComments(res.comments));
  }, []);

  return (
    <>
      <AutosaveTextarea
        className="form-control"
        onKeyDown={() => undefined}
        onKeyUp={() => undefined}
        onSave={async () => {
          /*operations.activities.patchActivity(activity.id, {
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
        comments.map(comment => (
          <div>
            { comment }
          </div>
        ))
      }
    </>
  );
};

export default TaskDiscussion;
