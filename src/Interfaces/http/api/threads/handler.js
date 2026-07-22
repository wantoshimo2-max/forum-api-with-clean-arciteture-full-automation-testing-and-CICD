import NewThreadUseCase from '../../../../Applications/use_case/NewThreadUseCase.js';
import GetThreadUseCase from '../../../../Applications/use_case/GetThreadUseCase.js';

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
  }

  async postThreadHandler(req, res, next) {
    try {
      const { title, body } = req.body;
      const { id: owner } = req.auth.credentials;

      const addThreadUseCase = this._container.getInstance(NewThreadUseCase.name);
      const addedThread = await addThreadUseCase.execute({ title, body, owner });

      res.status(201).json({
        status: 'success',
        data: {
          addedThread,
        },
      });
    } catch (error) {
      // console.error(error);
      next(error);
    }
  }

  async getThreadByIdHandler(req, res, next) {
    try {
      const { threadId } = req.params;
      const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
      const thread = await getThreadUseCase.execute(threadId);

      res.status(200).json({
        status: 'success',
        data: {
          thread,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ThreadsHandler;