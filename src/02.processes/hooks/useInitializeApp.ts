import { useValidateHash } from "@/07.shared/hooks";
import { useEffect, useState } from "react";
import cookie from "@/07.shared/lib/cookie";
import { setupPrivateInterceptors } from "@/07.shared/lib/axios";
import { socket } from "@/07.shared/lib/socket";

const useInitializeApp = () => {
  // const { data: player } = useGetPlayerQuery();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const isHashValid = useValidateHash();

  useEffect(() => {
    const getAsyncData = async () => {
      // const ipApi = await serviceApi.getIp();
      // window.ipApi = ipApi;
      socket.connect();
      setIsAppLoaded(true);
    };

    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.setHeaderColor("#d21a07");
    window.Telegram.WebApp.setBackgroundColor("#1f1f1f");

    getAsyncData();

    setupPrivateInterceptors({
      getToken: () => cookie.getCookie("token"),
      onRefresh: async () => {
        // const hash = window.Telegram.WebApp.initData || "DEFAULT_HASH";
        // const token = await authApi.refresh(hash);
        // if (token) {
        // cookie.setCookie("token", token); // если нужно обновить
        // }
        // return token;
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAppLoaded, isHashValid };
};

export default useInitializeApp;
