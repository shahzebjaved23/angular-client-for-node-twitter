import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetsComponent } from './tweets/tweets.component';
import { ChartComponent } from './chart/chart.component';
import { PlayerinfoComponent } from './playerinfo/playerinfo.component';
import { FormComponent } from './form/form.component';
import { ChartModule } from 'angular2-chartjs';
import { MainImageComponent } from './main-image/main-image.component';
import { Ng2TweetModule } from 'ng2-tweet/lib/index';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TweetComponent,
    TweetsComponent,
    ChartComponent,
    PlayerinfoComponent,
    FormComponent,
    MainImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ChartModule,
    Ng2TweetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
