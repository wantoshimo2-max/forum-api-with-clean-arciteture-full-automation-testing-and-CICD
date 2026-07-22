class DeleteComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, threadId, owner } = payload;

    this.id = id;
    this.threadId = threadId;
    this.owner = owner;
  }

  _verifyPayload({ id, threadId, owner }) {
    if (!id || !threadId || !owner) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof threadId !== 'string' || typeof owner !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default DeleteComment;
