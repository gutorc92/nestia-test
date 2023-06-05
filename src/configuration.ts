export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  rabbitmqHost: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  rabbitmqQueue: process.env.RABBITMQ_QUEUE,
  database: {
    host: process.env.API_DATABASE_HOST,
    port: parseInt(process.env.API_DATABASE_PORT as string, 10) || 5432,
    db: process.env.API_DATABASE_DB,
    user: process.env.API_DATABASE_USER,
    password: process.env.API_DATABASE_PASSWORD,
  },
});
