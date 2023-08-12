import { MetricAction, MetricActionTypes } from './actions';
import { Metric } from './types';

export default function reducer(state: Metric[] | null = null, action: MetricAction) {
  switch (action.type) {
    case MetricActionTypes.GET_METRICS_RESPONSE:
      return action.payload.metrics;
    case MetricActionTypes.CREATE_METRIC_RESPONSE:
      return (state || []).concat(action.payload.metric);
    case MetricActionTypes.UPDATE_METRIC_RESPONSE:
    case MetricActionTypes.PATCH_METRIC_RESPONSE:
      return state?.map(metric => {
        if (metric.id === action.payload.metric.id) {
          return action.payload.metric;
        }
        return metric;
      });
    case MetricActionTypes.DELETE_METRIC_RESPONSE:
      return state?.filter(metric => metric.id !== action.payload.metricId);
    default:
      return state;
  }
}
