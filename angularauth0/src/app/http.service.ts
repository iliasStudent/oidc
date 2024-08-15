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
  private apiKey = '270fd59ba8804655885135026241508';

  constructor(private http: HttpClient) { }
  getCurrentWeather(city: string, access_token: any): Observable<any> {
    console.log("DAT" + access_token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token} `
    });
    return this.http.get<weatherData>(this.apiUrl + city, {headers});
  }

  getAccessToken(authorizationCode: string): Observable<any> {
    console.log("AUTHCODE: " + authorizationCode);
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'mCYR2dStiPYfyDqK5tMKgm455mHvrEBU');
    body.set('client_secret', 'NhtRebXme1uk4tWX6ITvEaxzmFCVIAoCMKDqDUA22jfBC_wLzjXbamcwrxOa7NSJ');
    body.set('code', authorizationCode);
    body.set('redirect_uri', "http://localhost:4200/callbackauth");
    body.set('state','Bankoko');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(this.http.post("https://dev-7qvir82wwwaaewg7.us.auth0.com/oauth/token/", body.toString(), { headers: headers }));

    return this.http.post("https://dev-7qvir82wwwaaewg7.us.auth0.com/oauth/token/", body.toString(), { headers: headers });
  }

  login(): Observable<any> {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', 'mCYR2dStiPYfyDqK5tMKgm455mHvrEBU');
    params.set('redirect_uri', 'http://localhost:4200/callbackauth');
    params.set('scope', 'openid profile email');
    params.set('audience', 'http://localhost:4200/weather');
    params.set('state', 'Bankoko');
  
    const authorizationUrl = `https://dev-7qvir82wwwaaewg7.us.auth0.com/authorize?${params.toString()}`;
    
    window.location.href = authorizationUrl;
    return of(null); 
  }

}
