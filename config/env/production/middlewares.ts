module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'", "*"], // Allows requests from all sources
          "script-src": ["'self'", "'unsafe-inline'", "*"],
          "connect-src": ["'self'", "http:", "https:", "*"], // Permit connections from any domain
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "strapi.io",
            "market-assets.strapi.io",
            "*", // temporary fixed , // PLEASE CHANGE THIS IN FUTURE
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "strapi.io",
            "market-assets.strapi.io",
            "*", // temporary fixed , // PLEASE CHANGE THIS IN FUTURE
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
