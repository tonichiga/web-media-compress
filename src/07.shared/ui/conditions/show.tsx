import { baseQuery } from "@/07.shared/lib";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const privateBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    /* Custom login for refresh */
    // const hash = window.Telegram.WebApp.initData || HASH;
    // const token = await authApi.refresh(hash);
    // if (token) {
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(userOperations.logout());
    // }
  }
  return result;
};

export { privateBaseQuery, baseQuery };
