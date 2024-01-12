import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60000 },
    }),
  );

  app.use(passport.initialize());

  app.use(passport.session());

  await app.listen(3001);

  const port = configService.getPort() || 3000;

  logger.log(
    `\n\n ..:: Graphql is running on: http://localhost:${port}/api \n\n`,
  );
}
bootstrap();
