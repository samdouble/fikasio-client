import { DateTime } from 'luxon';

const getEstimatedCompletionDate = objective => {
  const { goal } = objective;
  const currentProgress = objective.progress || 0;
  const initialProgress = objective.initialProgress || 0;
  const completionRatio = goal && (currentProgress / goal);
  const estimatedCompletionTs = completionRatio
    && (
      (
        ((Date.now() - objective.createdAt) * (goal - initialProgress))
        / (currentProgress - initialProgress)
      )
      + objective.createdAt
    );
  const estimatedCompletionDate = estimatedCompletionTs && DateTime.fromJSDate(new Date(estimatedCompletionTs));
  return estimatedCompletionDate;
}

export {
  getEstimatedCompletionDate,
};
