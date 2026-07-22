class DeleteAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    this.refreshToken = payload.refreshToken;
  }

  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('DELETE_AUTH.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default DeleteAuth;
