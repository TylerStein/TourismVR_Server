import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Inject } from '@nestjs/common';
import { TokenService } from '../../shared/token.service';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private tokenService: TokenService,
  ) {}

  @Post('player')
  @HttpCode(200)
  authorizePlayer(@Body() body: { key: string }): { token: string } {
    if (!body.key) throw new HttpException('Requires field: key', HttpStatus.BAD_REQUEST);
    const token = this.tokenService.createToken();
    return { token };
  }

  @Post('controller')
  @HttpCode(200)
  authorizeController(@Body() body: { token: string }): { authorized: boolean } {
    if (!body.token) throw new HttpException('Requires field: code', HttpStatus.BAD_REQUEST);
    if (this.tokenService.tokenExists(body.token)) {
      return { authorized: true };
    } else {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
