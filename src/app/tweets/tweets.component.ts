import { Component, OnInit, Input, ChangeDetectorRef , ViewChild} from '@angular/core';
import { TweetsService } from "../tweets.service";
/// <reference path="../../typings/globals/socket.io-client/index.d.ts" /> 
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import  * as $ from "jquery";


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

	@Input() player: String;
	@Input() team: String;
	@Input() author: String;

	@ViewChild("loader") loader;

	private socket;
	private tweets;

	constructor(private cd: ChangeDetectorRef,private tweetsservice: TweetsService) { }

	getTweetFromStream(){
		// let observable = new Observable(observer => {
		//   this.socket = io.connect(this.tweetsservice.url);
		//   this.socket.on('tweet', (data) => {
		//     console.log(data);
		//     observer.next(data);    
		//   });
		  
		//   return () => {
		//     this.socket.disconnect();
		//   };  
		// })     
		// return observable;
	}  
	


	ngOnInit() {

		$(this.loader.nativeElement).hide();

		// this.socket = io.connect(this.tweetsservice.url);

		// this.socket.on("tweet",(data)=>{
		// 	if(this.tweets.indexOf(data.tweet) == -1){
		// 		this.tweets.unshift(data.tweet);
		// 		// console.log(data);	
		// 	}
		// })

		this.tweetsservice.buttonClickEmitter.subscribe((info)=>{
			$(this.loader.nativeElement).show();
			this.tweets = null;
			console.log(this.tweets);
			console.log(info);

			if (info.useDb){
				this.tweetsservice.getTweetsFromDb(info.player,info.team,info.author,info.player_team_op,info.team_author_op).subscribe((tweets)=>{
					this.tweets = tweets.json();
					console.log(this.tweets.length);
					this.cd.markForCheck();
					$(this.loader.nativeElement).hide();
				})
			}else {
				console.log("not using the db");
				this.tweetsservice.getTweetsByRest(info.player,info.team,info.author,info.player_team_op,info.team_author_op).subscribe((tweets)=>{
					this.tweets = tweets.json();
					console.log(this.tweets.length);
					this.cd.markForCheck();
					$(this.loader.nativeElement).hide();
				})
				
			}
			console.log("inside the button click emitter");
			this.cd.markForCheck();
		});
			

		}

}


// getTweetsByRest
// getTweetsFromStream
// getTweetsFromDb