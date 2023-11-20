import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { weatherData } from '../weatherdata';
import { AuthServiceService } from '../authservice.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weatherData: weatherData | undefined;

  constructor(private httpService: HttpService, private authservice: AuthServiceService) { }

  ngOnInit() {
    this.getWeather('Antwerp');
  }

  getWeather(city: string) {
    this.httpService.getCurrentWeather(city, this.authservice.access_token)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
  }
}
