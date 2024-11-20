
const parse = require("pg-connection-string").parse;

const { host, port, database, user, password } = parse(
  process.env.DATABASE_URL
);

export default ({ env }) => ({
  connection: {  
    client: 'postgres',
    connection: {
      host,
      port,
      database,
      user,
      password,
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        ca: env('DATABASE_CA'),
      },
    },
    debug: false,
  },
  // connection: {
  //   client: env('DATABASE_CLIENT'),
  //   connection: {
  //     host: env("DATABASE_HOST"),
  //     port: env.int("DATABASE_PORT"),
  //     database: env("DATABASE_NAME"),
  //     user: env("DATABASE_USERNAME"),
  //     password: env("DATABASE_PASSWORD"),
  //     ssl: {
  //       ca: env("DATABASE_CA"),
  //     },
  //     pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
  //   },
  //   debug: false,
  // },
});
