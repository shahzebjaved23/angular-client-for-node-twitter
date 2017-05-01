import { Component, OnInit, Input } from '@angular/core';
import { TweetsService } from "../tweets.service";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

	@Input() player: String;
	@Input() team: String;
	@Input() author: String;



	tweets: any[] = [];

	constructor(private tweetsservice: TweetsService) { }

	ngOnInit() {


		// this.tweetsservice.getTweets(this.player,this.team,this.author).subscribe(
		// 	(tweets)=> {
		// 		this.tweets = tweets.json();
		// 	}
		// );

		this.tweetsservice.buttonClickEmitter.subscribe(
			(info)=>{
				console.log("inside the button click emitter");
				this.tweetsservice.getTweets(info.player,info.team,info.author).subscribe(
					(tweets)=> {
						console.log("inside the get tweets");
						this.tweets = tweets.json();
					}
				)
			}
	    )

	}

}
