import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TweetsService {

	constructor(private http: Http) { } 

	url = "https://node-twitter-123.herokuapp.com"

	getTweets(player:String,team:String,author:String){
		return this.http.get(this.url+"/find?player="+player+"&team="+team+"&author="+author)
	}
}
