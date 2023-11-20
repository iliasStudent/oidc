import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public id_token: string | null = null;
  public access_token : string | null = null;
  
  constructor(http : HttpService){

  }

  setAccessToken(token: any){
    this.access_token = token;
    
  }

  setIdToken(token: any){
    this.id_token = token;
  }
  
}