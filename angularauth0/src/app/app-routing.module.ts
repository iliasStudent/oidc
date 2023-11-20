import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { AuthGuard } from './auth.guard';
import { CallbackauthComponent } from './callbackauth/callbackauth.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"callbackauth",component:CallbackauthComponent},
  {path:"weather", component:WeatherComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
