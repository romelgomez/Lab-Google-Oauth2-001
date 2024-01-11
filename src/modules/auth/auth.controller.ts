import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth-guard';

// /api/auth
@Controller('auth')
export class AuthController {
  // /api/auth/google/login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(): string {
    return 'Google Auth Login';
  }

  // /api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(): string {
    return 'Google Auth Redirect';
  }
}
