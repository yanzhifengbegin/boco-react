export default {
  // 超时时长
  timeout: 20000,

  // 相关url
  urls: {
    // 员工登录页面
    loginUrl: "/mobile/login",
    // 客户登录页面
    clientLoginUrl: "/mobile/client/login",
    //默认页
    defaultUrl: "/mobile/app",
    qrcodeUrl: "/mobile/qrcode",
    clientQrcodeUrl: "/mobile/clinet/qrcode",
    // 可以匿名访问的url
    anonymousUrls: ["/mobile/login"],
    domain: "wofengcem.com",
  },
};
