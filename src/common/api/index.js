import locales from "./locales";
import axios from "axios";
import configs from "./configs";
import constants from "../constants";
// const CancelToken = axios.CancelToken;

function createWebService() {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  let axiosProxy = axios.create({
    timeout: configs.timeout,
  });

  //请求拦截器
  axiosProxy.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //添加响应拦截器
  axiosProxy.interceptors.response.use(
    (response) => {
      const res = response.data;
      return res;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        //忽略掉可以匿名访问的url
        let isMatchAnonyUrl = configs.urls.anonymousUrls.reduce(
          (result, current) => {
            if (!result) {
              let reg = new RegExp(current, "g");
              return reg.test(window.location.pathname);
            }
            return result;
          },
          false
        );
        if (!isMatchAnonyUrl) {
          // history.replace('/login');
        }
      }
      return Promise.reject({
        status: error.response && error.response.status,
        ...(error.response && error.response.data),
      });
    }
  );

  return new Proxy(
    {},
    {
      get(target, propKey, receiver) {
        return (parameters) =>
          new Promise((resolve, reject) => {
            let {
              // 如果需要传递全部的url 如调用外部接口 可以使用此参数
              fullUrl,
              // API后缀名
              apiPath = "backend",
              // http请求类型
              type = "get",
              contentType = "application/json",
              // 是否需要显示成功消息提醒
              showSuccessMessage = true,
              // 是否需要显示失败消息提醒
              showErrorMessage = true,
              // 成功提醒内容
              defaultSuccessMessage,
              // 失败提醒内容
              defaultErrorMessage,
              // 传递数据
              data = {},
            } = parameters;
            const headers = { "content-type": contentType };
            let axiosData = {},
              axiosParams = {};
            // `params` are the URL parameters to be sent with the request
            if (type === "get") {
              axiosParams = data;
            } else {
              axiosData = data;
            }

            let apiUrl =
              fullUrl || `${constants.APP_HOST || ""}/${apiPath}/${propKey}`;
            axiosProxy({
              method: type,
              url: apiUrl,
              data: axiosData,
              params: axiosParams,
              headers: headers,
              // cancelToken: new CancelToken(cancel => {
              //     this.cancelRequest = cancel;
              // })
            })
              .then((resp) => {
                if (showSuccessMessage) {
                  const message = getSuccessMessage(
                    type,
                    defaultSuccessMessage
                  );
                  message && Toast.success(message);
                }
                resolve(resp);
              })
              .catch((reason) => {
                if (showErrorMessage) {
                  const message = getErrorMessage(
                    type,
                    defaultErrorMessage || reason.message
                  );
                  message && Toast.fail(message);
                }
                reject(reason);
              });
          });
      },
    }
  );
}

function getSuccessMessage(type, defaultMessage = null) {
  switch (type) {
    case "post":
      return defaultMessage || locales.get("message.saveSuccess");
    case "put":
      return defaultMessage || locales.get("message.saveSuccess");
    case "del":
      return defaultMessage || locales.get("message.saveSuccess");
    case "get":
    default:
      return defaultMessage || null;
  }
}

function getErrorMessage(type, defaultMessage = null) {
  switch (type) {
    case "post":
      return defaultMessage || locales.get("message.saveError");
    case "put":
      return defaultMessage || locales.get("message.saveError");
    case "del":
      return defaultMessage || locales.get("message.deleteError");
    case "get":
      return defaultMessage || locales.get("message.getDataError");
    default:
      return defaultMessage || null;
  }
}

export default createWebService();
