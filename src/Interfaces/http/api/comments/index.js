import CommentsHandler from './handler.js';
import createCommentsRoute from './routes.js';

export default (container) => {
  const commentsHandler = new CommentsHandler(container);
  return createCommentsRoute(commentsHandler, container);
};
