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
				console.log(info);
				if (info.useDb){
					this.tweetsservice.getTweetsFromDb(info.player,info.team,info.author,info.source).subscribe((tweets)=>{
						this.tweets = tweets.json();
					})
				}else {
					console.log("not using the db");
					if(info.source == "rest"){
						console.log("using the rest")
						this.tweetsservice.getTweetsByRest(info.player,info.team,info.author).subscribe((tweets)=>{
							this.tweets = tweets.json();
						})
					}else if(info.source == "stream"){
						console.log("using the stream")
						this.tweetsservice.getTweetsFromStream(info.player,info.team,info.author).subscribe((tweets)=>{
							this.tweets = tweets.json();
						})
					}
				}
				console.log("inside the button click emitter");
			}
	    )

	}

}


// getTweetsByRest
// getTweetsFromStream
// getTweetsFromDb