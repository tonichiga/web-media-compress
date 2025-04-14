import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { baseQuery } from "./base-rtk-api";
import { axiosForNextApi } from "../axios";

const privateBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const res = await axiosForNextApi.get("/api/refresh");

    if (res?.data) {
      result = await baseQuery(args, api, extraOptions); // Повторный запрос только при успешном обновлении токена
    } else {
      await axiosForNextApi.get("/api/logout");
    }
  }

  return result;
};

export { privateBaseQuery, baseQuery };
