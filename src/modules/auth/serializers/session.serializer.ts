import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/modules/users/user.entity';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void): void {
    console.log('serializeUser', user);

    done(null, user);
  }

  async deserializeUser(
    user: User,
    done: (err: Error, payload: any) => void,
  ): Promise<void> {
    const payload = await this.authService.findUserById(user.id);

    console.log('deserializeUser', payload);

    return payload ? done(null, payload) : done(null, null);
  }
}
