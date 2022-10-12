import axios from 'axios';

export async function getFetch<T>(url: string, params = {}) {
  return axios.get<T>(url, { ...params }).then((response) => response.data);
}

export async function postFetch<T>(url: string, data: T) {
  return axios.post<T>(url, data).then((response) => response.data);
}
