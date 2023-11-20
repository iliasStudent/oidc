import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice : AuthServiceService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    console.log(this.authservice.id_token);
    console.log(this.authservice.access_token);
    if (this.authservice.id_token != undefined || this.authservice.id_token != null) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}