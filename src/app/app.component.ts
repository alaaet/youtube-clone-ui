import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [OidcSecurityService],
})
export class AppComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}
  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(( { isAuthenticated }) => {
        console.log('app authenticated', isAuthenticated );

      });
  }
  title = 'youtube-clone-ui';
}
