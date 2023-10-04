import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // providers:[OidcSecurityService]
})
export class HeaderComponent implements OnInit{

  isAuthorized: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService) {

  }
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthorized = isAuthenticated;
    } );
  }

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }
  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens();
  }
}
