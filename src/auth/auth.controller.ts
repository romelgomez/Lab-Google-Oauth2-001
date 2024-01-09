import { Controller, Get } from '@nestjs/common';

// /api/auth
@Controller('auth')
export class AuthController {
  // /api/auth/google/login
  @Get('google/login')
  handleLogin(): string {
    return 'Google Auth Login';
  }

  // /api/auth/google/redirect
  @Get('google/redirect')
  handleGoogleRedirect(): string {
    return 'Google Auth Redirect';
  }
}
