class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(threadId);

    const filteredThread = { ...thread };
    delete filteredThread.owner;
    return {
      ...filteredThread,
      comments: comments.map(({ id, username, date, content, is_delete: isDelete }) => ({
        id,
        username,
        date,
        content: isDelete ? '**komentar telah dihapus**' : content,
      })),
    };
  }
}

export default GetThreadUseCase;
