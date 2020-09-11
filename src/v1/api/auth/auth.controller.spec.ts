import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TokenService } from '../../shared/token.service';

describe('AuthController', () => {
  let tokenController: AuthController;
  let tokenService: TokenService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [TokenService],
    }).compile();

    tokenController = app.get<AuthController>(AuthController);
    tokenService = app.get<TokenService>(TokenService);
  });

  describe('player auth', () => {
    it('should create a token for the player', () => {
      const response = tokenController.authorizePlayer({ key: 'xxx' });
      expect(response.token.length).toBe(tokenService.tokenLength);
    });
  });

  describe('controller auth', () => {
    it('should confirm authorization given a valid token', () => {
      const response = tokenController.authorizePlayer({ key: 'xxx' });
      expect(tokenController.authorizeController({ token: response.token })).toBe(true);
    })
  })
});
