import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AppConfigService } from 'src/modules/config/config.service';
import { ProcessEnvEnum } from 'src/modules/config/config.types';
import { AuthService } from '../auth.service';
// import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected appConfigService: AppConfigService,
    protected authService: AuthService, // protected readonly userService: UserService,
  ) {
    super({
      clientID: appConfigService.getEnvVal(ProcessEnvEnum.GOOGLE_CLIENT_ID),
      clientSecret: appConfigService.getEnvVal(
        ProcessEnvEnum.GOOGLE_CLIENT_SECRET,
      ),
      callbackURL: appConfigService.getEnvVal(
        ProcessEnvEnum.GOOGLE_CALLBACK_URL,
      ),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { name, emails, photos } = profile;

    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const user = await this.authService.validateUser({
      email: emails[0].value,
      displayName: name.displayName,
      givenName: name.givenName,
      familyName: name.familyName,
    });

    console.log('Validate user');
    console.log('user', user);

    return user;

    // done(null, user);

    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   picture: photos[0].value,
    //   accessToken,
    // };

    // done(null, user);
  }
}
