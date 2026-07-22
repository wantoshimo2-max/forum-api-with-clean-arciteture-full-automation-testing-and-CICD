import DeleteAuth from '../DeleteAuth.js';

describe('DeleteAuth entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action & Assert
    expect(() => new DeleteAuth(payload)).toThrowError('DELETE_AUTH.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      refreshToken: 1234,
    };

    // Action & Assert
    expect(() => new DeleteAuth(payload)).toThrowError('DELETE_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeleteAuth entities correctly', () => {
    // Arrange
    const payload = {
      refreshToken: 'refreshToken',
    };

    // Action
    const deleteAuth = new DeleteAuth(payload);

    // Assert
    expect(deleteAuth).toBeInstanceOf(DeleteAuth);
    expect(deleteAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
