# Lab Google Oauth2

project name: oauth2-concept-001

Video: https://www.youtube.com/watch?v=OitgkKTxht4

## Steps

- [x] Create Google OAuth2 App in Google Console
- [x] Create NestJS Project
- [x] Create Auth Controller
- [x] Create Auth Service
- [x] Create Google Strategy
- [x] Create Google Auth Guard
- [x] Connect to a Database
- [x] Configure Sessions

## Notes

- Go to google cloud console and create a new google cloud project.
- Go to the APIs and Services.
- Add npm deps: @nestjs/passport passport passport-google-oauth20

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
