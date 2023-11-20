import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthServiceService } from './authservice.service';
import { weatherData } from './weatherdata';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:3000/api/weather/';
  private apiKey = '6a060dcf7d41496db2802622231811';

  constructor(private http: HttpClient) { }
  getCurrentWeather(city: string, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token} `
    });
    return this.http.get<weatherData>(this.apiUrl + city, {headers});
  }

  getAccessToken(authorizationCode: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'lDpFkylmWzyauZsuGuYlHD8zx9uWZ3rd');
    body.set('client_secret', 'P_A47XvfiiLGpNEw4_QBmyW1HufTpUB2_ITZE2FsPX2rZuhpp0yaUluft7ww-Bfo');
    body.set('code', authorizationCode);
    body.set('redirect_uri', "http://localhost:4200/callbackauth");
    body.set('state','Bankoko');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post("https://dev-vjf815mo6cnziql2.eu.auth0.com/oauth/token/", body.toString(), { headers: headers });
  }

  login(): Observable<any> {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', 'lDpFkylmWzyauZsuGuYlHD8zx9uWZ3rd');
    params.set('redirect_uri', 'http://localhost:4200/callbackauth');
    params.set('scope', 'openid profile email');
    params.set('audience', 'http://localhost:4200/weather');
    params.set('state', 'Bankoko');
  
    const authorizationUrl = `https://dev-vjf815mo6cnziql2.eu.auth0.com/authorize?${params.toString()}`;
    
    window.location.href = authorizationUrl;
    return of(null); 
  }

}
