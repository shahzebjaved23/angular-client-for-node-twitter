import { Component, OnInit, Input } from '@angular/core';
import { TweetsService } from "../tweets.service";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
  providers: [TweetsService]
})
export class TweetsComponent implements OnInit {

	@Input() player: String;
	@Input() team: String;
	@Input() author: String;



	tweets: any[] = [];

	constructor(private tweetsservice: TweetsService) { }

	ngOnInit() {

		console.log(this.player);
		console.log(this.team);
		console.log(this.author);


		this.tweetsservice.getTweets(this.player,this.team,this.author).subscribe(
			(tweets)=> {
				this.tweets = tweets.json();
			}
		);

	}

}
