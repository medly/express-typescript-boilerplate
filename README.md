# express-typescript-boilerplate

## Steps to run locally

1. Add `.env` file with following environment variables.

   ```text
      OKTA_ISSUER=<url for okta authorization server or okta issuer>
      OKTA_DOMAIN=<okta domain>
      OKTA_API_KEY=<okta authorization server api key>
      OKTA_ADMINS_GROUP_ID=<Group id of super admin users>
   ```

2. Install dependencies using: `yarn`

3. Run locally using: `yarn dev`

## Tech Stack

- WebServer: Express
- Test: Jest
- Http Test: Supertest
- Build/Package: Yarn
