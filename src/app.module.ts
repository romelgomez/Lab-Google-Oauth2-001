import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategies/snake-naming.strategy';
import { AppConfigService } from './modules/config/config.service';
import { AppConfigModule } from './modules/config/config.module';
import { UserModule } from './modules/users/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AppConfigModule,

    UserModule,

    PassportModule.register({ session: true }),

    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const { type, host, port, username, password, database, synchronize } =
          appConfigService.getDatabaseConfig();

        return {
          type,
          host,
          port,
          username,
          password,
          database,
          synchronize,
          // https://stackoverflow.com/questions/51562162/no-metadata-for-user-was-found-using-typeorm
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
