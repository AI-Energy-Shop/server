module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT"),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      ssl: {
        ca: env("DATABASE_CA"),
      },
      pool: {
        min: 2, // Minimum number of connections
        max: 10, // Increase this limit (e.g., 15-20)
      },
    },
    debug: false,
  },
});
