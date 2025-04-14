import { axiosForPrivate } from "./axios-instance";

// Функция, которая настраивает интерцепторы
export function setupPrivateInterceptors(options: {
  getToken: () => string | null;
  onRefresh: () => Promise<string | void>;
}) {
  axiosForPrivate.interceptors.request.use((config) => {
    const token = options.getToken();
    if (!token) return config;
    config.headers.set("Authorization", `Bearer ${token}`);
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/x-www-form-urlencoded");

    return config;
  });

  axiosForPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await options.onRefresh();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosForPrivate(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
}
