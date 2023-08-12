import { Dispatch } from 'redux';
import {
  getMetrics as APIgetMetrics,
  createMetric as APIcreateMetric,
  updateMetric as APIupdateMetric,
  patchMetric as APIpatchMetric,
  deleteMetric as APIdeleteMetric,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createMetricRequest,
  createMetricResponse,
  getMetricsRequest,
  getMetricsResponse,
  updateMetricRequest,
  updateMetricResponse,
  patchMetricRequest,
  patchMetricResponse,
  deleteMetricRequest,
  deleteMetricResponse,
  MetricAction,
} from './actions';
import { Metric } from './types';

type MetricDispatch = Dispatch<MetricAction>;

function fetchMetrics(filter = {}) {
  return fetchOnceOperation(
    getMetricsRequest,
    getMetricsResponse,
    APIgetMetrics,
    state => state.metrics,
    [filter],
  );
}

function createMetric(metric: Metric) {
  return (dispatch: MetricDispatch) => {
    dispatch(createMetricRequest({ metric }));
    return APIcreateMetric(metric)
      .then(res => dispatch(createMetricResponse({ ...res })));
  };
}

function updateMetric(id, metric: Metric) {
  return (dispatch: MetricDispatch) => {
    dispatch(updateMetricRequest({ id, metric }));
    return APIupdateMetric(id, metric)
      .then(res => dispatch(updateMetricResponse({ ...res })));
  };
}

function patchMetric(id, metric: Metric) {
  return (dispatch: MetricDispatch) => {
    dispatch(patchMetricRequest({ id, metric }));
    return APIpatchMetric(id, metric)
      .then(res => dispatch(patchMetricResponse({ ...res })));
  };
}

function deleteMetric(metricId: string) {
  return (dispatch: MetricDispatch) => {
    dispatch(deleteMetricRequest({ metricId }));
    return APIdeleteMetric(metricId)
      .then(res => dispatch(deleteMetricResponse({ ...res })));
  };
}

const operations = {
  fetchMetrics,
  createMetric,
  updateMetric,
  patchMetric,
  deleteMetric,
};

export default operations;
