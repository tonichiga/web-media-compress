export const logger = (logname: string, error: unknown) => {
  if (typeof error !== "object") return;

  if ("response" in error && typeof error.response === "object") {
    if ("data" in error.response && "status" in error.response) {
      console.log(logname + " :", error.response.data);
      console.log(logname + " :", error.response?.status);

      return;
    }
  } else if ("request" in error && typeof error.request === "object") {
    console.log(logname + " :", error.request);
    return;
  }

  if ("config" in error && typeof error.config === "object") {
    console.log(logname + " :", error?.config);
    return;
  }

  if ("message" in error && typeof error.message === "object") {
    console.log(logname + " :", error?.message);
    return;
  }

  console.log(logname + " :", error);
};
