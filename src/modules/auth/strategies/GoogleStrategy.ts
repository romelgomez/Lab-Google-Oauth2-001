import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AppConfigService } from 'src/modules/config/config.service';
import { ProcessEnvEnum } from 'src/modules/config/config.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(protected appConfigService: AppConfigService) {
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

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
