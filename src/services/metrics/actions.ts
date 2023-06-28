import { Metric } from './types';

export enum MetricActionTypes {
  CREATE_METRIC_REQUEST = 'CREATE_METRIC_REQUEST',
  CREATE_METRIC_RESPONSE = 'CREATE_METRIC_RESPONSE',
  GET_METRICS_REQUEST = 'GET_METRICS_REQUEST',
  GET_METRICS_RESPONSE = 'GET_METRICS_RESPONSE',
  UPDATE_METRIC_REQUEST = 'UPDATE_METRIC_REQUEST',
  UPDATE_METRIC_RESPONSE = 'UPDATE_METRIC_RESPONSE',
  PATCH_METRIC_REQUEST = 'PATCH_METRIC_REQUEST',
  PATCH_METRIC_RESPONSE = 'PATCH_METRIC_RESPONSE',
  DELETE_METRIC_REQUEST = 'DELETE_METRIC_REQUEST',
  DELETE_METRIC_RESPONSE = 'DELETE_METRIC_RESPONSE',
}

export type MetricAction =
  | { type: MetricActionTypes.CREATE_METRIC_REQUEST; payload: { metric: Metric } }
  | { type: MetricActionTypes.CREATE_METRIC_RESPONSE; payload: { metric: Metric } }
  | { type: MetricActionTypes.GET_METRICS_REQUEST; payload: { metrics: Metric[] } }
  | { type: MetricActionTypes.GET_METRICS_RESPONSE; payload: { metrics: Metric[] } }
  | { type: MetricActionTypes.UPDATE_METRIC_REQUEST; payload: { id: string; metric: Metric } }
  | { type: MetricActionTypes.UPDATE_METRIC_RESPONSE; payload: { metric: Metric } }
  | { type: MetricActionTypes.PATCH_METRIC_REQUEST; payload: { id: string; metric: Partial<Metric> } }
  | { type: MetricActionTypes.PATCH_METRIC_RESPONSE; payload: { metric: Metric } }
  | { type: MetricActionTypes.DELETE_METRIC_REQUEST; payload: { metricId: string } }
  | { type: MetricActionTypes.DELETE_METRIC_RESPONSE; payload: { metricId: string } };

export const createMetricRequest = (payload: { metric: Metric }): MetricAction => ({
  type: MetricActionTypes.CREATE_METRIC_REQUEST,
  payload,
});

export const createMetricResponse = (payload: { metric: Metric }): MetricAction => ({
  type: MetricActionTypes.CREATE_METRIC_RESPONSE,
  payload,
});

export const getMetricsRequest = (payload: { metrics: Metric[] }): MetricAction => ({
  type: MetricActionTypes.GET_METRICS_REQUEST,
  payload,
});

export const getMetricsResponse = (payload: { metrics: Metric[] }): MetricAction => ({
  type: MetricActionTypes.GET_METRICS_RESPONSE,
  payload,
});

export const updateMetricRequest = (payload: { id: string, metric: Metric }): MetricAction => ({
  type: MetricActionTypes.UPDATE_METRIC_REQUEST,
  payload,
});

export const updateMetricResponse = (payload: { metric: Metric }): MetricAction => ({
  type: MetricActionTypes.UPDATE_METRIC_RESPONSE,
  payload,
});

export const patchMetricRequest = (payload: { id: string, metric: Partial<Metric> }): MetricAction => ({
  type: MetricActionTypes.PATCH_METRIC_REQUEST,
  payload,
});

export const patchMetricResponse = (payload: { metric: Metric }): MetricAction => ({
  type: MetricActionTypes.PATCH_METRIC_RESPONSE,
  payload,
});

export const deleteMetricRequest = (payload: { metricId: string }): MetricAction => ({
  type: MetricActionTypes.DELETE_METRIC_REQUEST,
  payload,
});

export const deleteMetricResponse = (payload: { metricId: string }): MetricAction => ({
  type: MetricActionTypes.DELETE_METRIC_RESPONSE,
  payload,
});
