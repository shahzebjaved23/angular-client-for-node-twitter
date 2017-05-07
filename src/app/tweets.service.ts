import { Injectable , EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { eventInfo } from "./eventInfo.model";

@Injectable()
export class TweetsService {

	buttonClickEmitter = new EventEmitter<eventInfo>();

	constructor(private http: Http) { } 

	// url = "https://node-twitter-123.herokuapp.com"

	url = "http://localhost:5000";

	getTweetsByRest(player:String,team:String,author:String){
		return this.http.get(this.url+"/getTweetsByRest?player="+player+"&team="+team+"&author="+author);
	}

	getTweetsFromStream(player:String,team:String,author:String){
		return this.http.get(this.url+"/getTweetsFromStream?player="+player+"&team="+team+"&author="+author);
	}

	getTweetsFromDb(player:String,team:String,author:String){
		return this.http.get(this.url+"/getTweetsFromDb?player="+player+"&team="+team+"&author="+author);
	}

	getFrequency(){
		return this.http.get(this.url+"/frequency");
	}

	emitButtomClickEvent(player: String,team: String, author: String, useDb:boolean){
		var info = new eventInfo(player,team,author,useDb);
		this.buttonClickEmitter.emit(info);
		console.log(info);
	}
}
