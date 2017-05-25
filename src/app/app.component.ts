import { Component } from '@angular/core';
import { TweetsService } from "./tweets.service";
import { Ng2TweetService } from 'ng2-tweet/lib/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TweetsService]
})
export class AppComponent {
 
  


  constructor(private ng2TweetService:Ng2TweetService){
  	this.ng2TweetService.LoadScript(); 
  }
}
