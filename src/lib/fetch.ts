import axios from 'axios';

export async function get<T>(
  url: string,
  params = {},
  mapper?: (_a: any) => T
) {
  return axios.get<T>(url, { ...params }).then((response) => {
    if (!mapper) {
      return response.data;
    }
    return mapper(response.data);
  });
}

export async function post<T>(url: string, data: T) {
  return axios.post<T>(url, data).then((response) => response.data);
}

const api = {
  get,
  post,
};

export default api;
