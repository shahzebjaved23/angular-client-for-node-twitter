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

/* 
*	gets the tweets from the api and for each call the tweet widget
*/ 
export class TweetsComponent implements OnInit {

	@Input() player: String;
	@Input() team: String;
	@Input() author: String;

	@ViewChild("loader") loader;

	private socket;
	private tweets;
	private notweets = false;
	private yestweets = true;

	constructor(private cd: ChangeDetectorRef,private tweetsservice: TweetsService) { }

	// connect the tweet stream api with socket io
	getTweetFromStream(){
		let observable = new Observable(observer => {
		  this.socket = io.connect(this.tweetsservice.url);
		  this.socket.on('tweet', (data) => {
		    console.log(data);
		    observer.next(data);    
		  });
		  
		  return () => {
		    this.socket.disconnect();
		  };  
		})     
		return observable;
	}  
	


	/*
	* on init, connect to the socket
	* subscribe to the button click event
	* when button clicked, get all the tweets
	*/
	ngOnInit() {

		// hide the loader
		$(this.loader.nativeElement).hide();

		// connect to the socket
		this.socket = io.connect(this.tweetsservice.url);

		// listen to the tweet event
		this.socket.on("tweet",(data)=>{
			if(this.tweets.indexOf(data.tweet) == -1){
				this.tweets.unshift(data.tweet);
				// console.log(data);	
			}
		})

		// subscribe to the get tweets button click event
		this.tweetsservice.buttonClickEmitter.subscribe((info)=>{
			$(this.loader.nativeElement).show();
			this.tweets = null;
			console.log(this.tweets);
			console.log(info);

			if (info.useDb){
				// if useDb, get tweets from db
				this.tweetsservice.getTweetsFromDb(info.player,info.team,info.author,info.player_team_op,info.team_author_op,info.count,info.stream).subscribe((tweets)=>{
					this.tweets = tweets.json();
					console.log(this.tweets.length);
					this.cd.markForCheck();
					if(this.tweets.length == 0){
						this.notweets = true;
						this.yestweets = false;
					}else{
						this.yestweets = true;
						this.notweets = false;
					}
					$(this.loader.nativeElement).hide();
					console.log(this.notweets);
					console.log(this.yestweets);
				})
			}else {
				// else get tweet from rest api
				console.log("not using the db");
				this.tweetsservice.getTweetsByRest(info.player,info.team,info.author,info.player_team_op,info.team_author_op,info.count,info.stream).subscribe((tweets)=>{
					this.tweets = tweets.json();
					console.log(this.tweets.length);
					this.cd.markForCheck();
					if(this.tweets.length == 0){
						this.notweets = true;
						this.yestweets = false;
					}else{
						this.yestweets = true;
						this.notweets = false;
					}
					$(this.loader.nativeElement).hide();
					console.log(this.notweets);
					console.log(this.yestweets);
				})
				
			}
			console.log("inside the button click emitter");
			this.cd.markForCheck();
		});
			

	}

}
