import Express from 'express';
import MentorController from '../controllers/MentorController';
import AuthController from '../controllers/AuthController';

const MentorRouter = Express.Router({ caseSensitive: false });

MentorRouter.route('/').get(AuthController.check, MentorController.getMentors);
MentorRouter.route('/:mentorid').get(AuthController.check, MentorController.getMentor);

export default MentorRouter;
