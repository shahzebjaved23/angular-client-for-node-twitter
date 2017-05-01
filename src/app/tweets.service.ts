import { Injectable , EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { eventInfo } from "./eventInfo.model";

@Injectable()
export class TweetsService {

	buttonClickEmitter = new EventEmitter<tring>();

	constructor(private http: Http) { } 

	url = "https://node-twitter-123.herokuapp.com"

	getTweets(player:String,team:String,author:String){
		return this.http.get(this.url+"/getTweetsByRest?player="+player+"&team=&author="+author)
	}

	getFrequency(){
		return this.http.get(this.url+"/frequency");
	}

	emitButtomClickEvent(player: String,team: String, author: String){
		var info = new eventInfo(player,team,author)
		this.buttonClickEmitter.emit(info);
		console.log("event emitted");
	}
}
