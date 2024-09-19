module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
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
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  // "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "cdn.jsdelivr.net",
            "syd1.digitaloceanspaces.com",
          ],
          // "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "strapi.io",
            "market-assets.strapi.io",
            "syd1.digitaloceanspaces.com",
            // "https://aienergyshop-strapi-uploads.syd1.cdn.digitaloceanspaces.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "strapi.io",
            "market-assets.strapi.io",
            "syd1.digitaloceanspaces.com",
            // "https://aienergyshop-strapi-uploads.syd1.cdn.digitaloceanspaces.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
