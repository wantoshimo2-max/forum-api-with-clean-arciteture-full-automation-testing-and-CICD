import DeleteAuth from '../../Domains/authentications/entities/DeleteAuth.js';

class DeleteAuthenticationUseCase {
  constructor({
    authenticationRepository,
  }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const { refreshToken } = new DeleteAuth(useCasePayload);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }
}

export default DeleteAuthenticationUseCase;
