import isEmpty from 'lodash.isempty';
import Route from 'route-parser';

export class HttpResponseError extends Error {
  status: string;

  code: number;

  response: Response;

  constructor(response: Response) {
    super(`HTTP Error ${response.statusText}`);
    this.status = response.statusText;
    this.response = response;
    this.code = response.status;
  }
}

const checkStatus = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  throw new HttpResponseError(response);
};

const hasDefinedValue = value => typeof value !== 'undefined' && value !== null;

const dataAsQueryString = (data: Record<string, string | number>) => {
  const query = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (hasDefinedValue(value)) {
      if (value.toString() === '[object Object]') {
        query.append(key, JSON.stringify(value));
      } else {
        query.append(key, value.toString());
      }
    }
  });
  const queryStr = query.toString();
  return (queryStr.length > 0 ? `?${queryStr}` : '');
};

const dataAsBodyPayload = data => {
  const payload = {};
  Object.entries(data).forEach(([key, value]) => {
    if (hasDefinedValue(value)) {
      payload[key] = value;
    }
  });

  if (isEmpty(payload)) {
    return JSON.stringify(payload);
  }
  return JSON.stringify(data);
};

const perform = async (endpoint, ressources) => {
  return fetch(`/api/v1${endpoint}`, ressources)
    .then(checkStatus);
};

export const get = async (endpoint, params = {}, query = {}) => {
  const ressources = {
    method: 'GET',
  };
  const route = new Route(endpoint);
  return perform(
    route.reverse(params) + dataAsQueryString(query),
    ressources,
  );
};

export const post = async (endpoint, params = {}, body = {}) => {
  const ressources = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: dataAsBodyPayload(body),
  };
  const route = new Route(endpoint);
  return perform(route.reverse(params), ressources);
};

export const put = async (endpoint, params = {}, body = {}) => {
  const ressources = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: dataAsBodyPayload(body),
  };
  const route = new Route(endpoint);
  return perform(
    route.reverse(params),
    ressources,
  );
};

export const patch = async (endpoint, params = {}, body = {}) => {
  const ressources = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: dataAsBodyPayload(body),
  };
  const route = new Route(endpoint);
  return perform(
    route.reverse(params),
    ressources,
  );
};

export const del = async (endpoint, params = {}, query = {}) => {
  const ressources = {
    method: 'DELETE',
  };
  const route = new Route(endpoint);
  return perform(
    route.reverse(params) + dataAsQueryString(query),
    ressources,
  );
};
