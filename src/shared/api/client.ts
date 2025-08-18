import Axios, { AxiosRequestConfig } from "axios";

// Использовать явное значение для URL API
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yourapp.com" // TODO: заменить
    : "http://localhost/api";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления JWT токена
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Получаем токен из localStorage или Zustand store
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Функция-клиент для Orval - имя должно совпадать с тем, что указано в orval.config.ts
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error - нужно для совместимости с React Query
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
