import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import { Request, Response, NextFunction } from 'express';
import MentorRouter from './routers/MentorRoute';
import BookingRouter from './routers/BookingRoute';
import AuthRouter from './routers/AuthRoute';

const __dirFile = fileURLToPath(import.meta.url);
const __dirName = dirname(__dirFile);

const App = Express();
App.disable('x-powered-by');

App.use(Express.static(join(__dirName, '../', 'public')));
// App.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
App.use(cors());
App.use(Express.json({ limit: '10kb' }));
App.use(Express.urlencoded({ extended: true, limit: '10kb' }));
App.use(hpp());

App.use('/api/v1/auth', AuthRouter);
App.use('/api/v1/mentors', MentorRouter);
App.use('/api/v1/bookings', BookingRouter);

App.use(/(.*)/, (_, res: Response) => res.sendFile(join(__dirName, '../', 'public', 'index.html')));

App.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
      error: err,
    });
  }
  next();
});

export default App;
