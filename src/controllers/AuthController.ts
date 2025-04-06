import CatchAsync from '../utils/CatchAsync';

export default {
  check: CatchAsync(async (req, _, next) => {
    req.user = 'smirs';
    return next();
  }),
  login: CatchAsync(async (req, res) => {
    return res.status(200).json({
      token: 'thisisaatesttoken',
    });
  }),
};
