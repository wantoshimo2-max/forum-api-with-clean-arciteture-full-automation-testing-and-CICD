import express from 'express';
import createAuthMiddleware from '../middleware/auth.js';

const createCommentsRoute = (handler, container) => {
  const router = express.Router({ mergeParams: true });
  const authMiddleware = createAuthMiddleware(container);

  router.post('/', authMiddleware, handler.postCommentHandler);
  router.delete('/:commentId', authMiddleware, handler.deleteCommentHandler);
  return router;
};

export default createCommentsRoute;
