import axios from 'axios';

export async function get<T>(
  url: string,
  params = {},
  mapper?: (_a: any) => T
) {
  return axios
    .get<T>(url, { ...params })
    .then((response) => {
      if (!mapper) {
        return response.data;
      }
      return mapper(response.data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw new Error(error.message);
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    });
}

export async function post<T>(url: string, data: any) {
  return axios
    .post<T>(url, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw new Error(error.message);
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    });
}

const api = {
  get,
  post,
};

export default api;
