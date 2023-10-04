import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-u8vjn8x2ijybpx67.us.auth0.com',
        redirectUrl: window.location.origin,
        clientId: 'BAgInycqhfaw7Fij6MdwwvxCbdlbJ9rF',
        scope: 'openid profile offline_acces email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        secureRoutes: ['http://localhost:8080/'],
        customParamsAuthRequest: {
          audience: 'http://localhost:8080',
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
