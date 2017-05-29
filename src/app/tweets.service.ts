import { Injectable , EventEmitter} from '@angular/core';
import { Http ,Jsonp, Headers, RequestOptions} from '@angular/http';
import { eventInfo } from "./eventInfo.model";
import { Observable } from 'rxjs/Rx';
import { chipsInfo } from "./chipsInfo.model";

@Injectable()
export class TweetsService {
    
	buttonClickEmitter = new EventEmitter<eventInfo>();
    chipifyiedEmitter = new EventEmitter<string>();
    requestChipifyEmitter = new EventEmitter<string>();
    
   
	constructor(private http: Http, private jsonp: Jsonp) { } 

	url = "https://node-twitter-123.herokuapp.com"

	// url = "http://localhost:5000";


  /*
  * emits the request chipify event
  * fired when the user clicks the get tweets button
  * it requests the chips component to chipify any text in its text input
  */
    requestChipify(){
        this.requestChipifyEmitter.emit("chipify");
    }

    /*
    * emits the chipified event
    * emits when the chips component has chipified all the text in the text input
    */
    emitChipified(){
        this.chipifyiedEmitter.emit("chipified");
    }

    /*
    * gets player auto complete
    * @param {string} name
    */
    getPlayerAutoComplete(name){
        return this.http.get(this.url+"/playerAutoComplete?name="+name);
    }


    /*
    * gets team auto complete
    * @param {string} name
    */
    getTeamAutoComplete(name){
        return this.http.get(this.url+"/teamAutoComplete?name="+name);
    }

    /*
    * gets player info
    * @param {string} player
    */
    getPlayerInfo(player){
        player = player.replace("#","%23");
        return this.http.get(this.url+"/getSparqlQuery?player="+player);
    }

    /*
    * gets the link preview
    * @param {string} url
    */
    getLinkPreview(url){
        return this.http.get(this.url+"/linkpreview?url="+url)
    }

    /*
    * gets the tweet oembed
    * @param {string} url (tweet url)
    */
    getOmbed(url){
        return this.http.get(this.url+"/getoEmbed?url="+url);
    }

    /*
    * gets the twitter embed from twitter oembed api
    * @param {Tweet} tweet
    */
	getEmbedTweet(tweet){
		return this.http.get("https://publish.twitter.com/oembed?url=https://twitter.com/"+tweet.user.screen_name+"/status/"+tweet.id);
	}

    /*
    * gets tweets by rest
    * @param {string} player
    * @param {string} team
    * @param {string} author
    * @param {string} player_team_op
    * @param {string} team_author_op
    * @param {number} count
    * @param {string} stream
    */
	getTweetsByRest(player:String,team:String,author:String,player_team_op:String,team_author_op:String,count,stream){
		player = player.replace("#","%23");
        team = team.replace("#","%23");
        author = author.replace("#","%23");
        return this.http.get(this.url+"/getTweetsByRest?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op+"&count="+count+"&stream="+stream);
	}

    /*
    * gets tweets by db
    * @param {string} player
    * @param {string} team
    * @param {string} author
    * @param {string} player_team_op
    * @param {string} team_author_op
    * @param {number} count
    * @param {string} stream
    */
	getTweetsFromDb(player:String,team:String,author:String,player_team_op:String,team_author_op:String,count,stream){
		console.log(count);
        console.log(stream);
        player = player.replace("#","%23");
        team = team.replace("#","%23");
        author = author.replace("#","%23");
        return this.http.get(this.url+"/getTweetsFromDb?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op+"&count="+count+"&stream="+stream);
	}

    /*
    * gets frequency
    * @param {string} player
    * @param {string} team
    * @param {string} author
    * @param {string} player_team_op
    * @param {string} team_author_op
    */
	getFrequency(player: String, team: String , author: String, player_team_op: String, team_author_op: String){
		player = player.replace("#","%23");
        team = team.replace("#","%23");
        author = author.replace("#","%23");
        return this.http.get(this.url+"/frequency?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op);
	}

    /*
    * emits the button click event,when user click the get tweets button
    * @param {string} player
    * @param {string} team
    * @param {string} author
    * @param {boolean} useDb
    * @param {string} player_team_op
    * @param {string} team_author_op
    * @param {number} count
    * @param {string} stream
    */
	emitButtomClickEvent(player: String,team: String, author: String, useDb:boolean, player_team_op: String, team_author_op:String,count,stream){
		console.log(stream);
        var info = new eventInfo(player,team,author,useDb,player_team_op,team_author_op,count,stream);
		this.buttonClickEmitter.emit(info);
		console.log(info);
	}   
}
