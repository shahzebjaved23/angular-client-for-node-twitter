import { Component } from '@angular/core';
import { TweetsService } from "./tweets.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TweetsService]
})
export class AppComponent {
  title = 'app works!';
  player = "Rooney";
  team = "Manutd";
  author = "";
}
