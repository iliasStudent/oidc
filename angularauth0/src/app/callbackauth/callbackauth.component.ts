import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-callbackauth',
  templateUrl: './callbackauth.component.html',
  styleUrls: ['./callbackauth.component.css']
})
export class CallbackauthComponent {

  constructor(private route: ActivatedRoute, private authService: AuthServiceService,private router: Router, private http: HttpService) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.http.getAccessToken(code).subscribe(result => {
          this.authService.setAccessToken(result.access_token);
          this.authService.setIdToken(result.id_token);
          this.router.navigate(['/weather']);
        });
      } else {
        console.error('No authorization code found in the URL');
      }
    }); 
}
}