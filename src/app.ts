import express, { Handler } from 'express';
import { DefaultRoute } from './app/modules/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cors from 'cors';
const app = express();

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hello World',
  });
});

app.use(cors());
app.use(express.json());

app.use('/api', DefaultRoute);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
