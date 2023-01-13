import express from 'express';
import 'dotenv/config';
import MongoClient from './database/mongo';
import routes from './routes/routes';


const main = async () => {

  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  app.use(routes);

  const port = process.env.PORT || 5050;

  app.listen(port, () => {
    console.log(`server is running in port ${port}`);
  });
};

main();
