import { Injectable , EventEmitter} from '@angular/core';
import { Http ,Jsonp, Headers, RequestOptions} from '@angular/http';
import { eventInfo } from "./eventInfo.model";
import { Observable } from 'rxjs/Rx';
import { chipsInfo } from "./chipsInfo.model";

@Injectable()
export class TweetsService {

	readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
	readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

	buttonClickEmitter = new EventEmitter<eventInfo>();
    
   
	constructor(private http: Http, private jsonp: Jsonp) { } 

	url = "https://node-twitter-123.herokuapp.com"

	// url = "http://localhost:5000";

   
    getPlayerAutoComplete(name){
        return this.http.get(this.url+"/playerAutoComplete?name="+name);
    }

    getTeamAutoComplete(name){
        return this.http.get(this.url+"/teamAutoComplete?name="+name);
    }

    getPlayerInfo(player){
        return this.http.get(this.url+"/getSparqlQuery?player="+player);
    }

    getLinkPreview(url){
        return this.http.get(this.url+"/linkpreview?url="+url)
    }

    getOmbed(url){
        return this.http.get(this.url+"/getoEmbed?url="+url);
    }

	getEmbedTweet(tweet){
		return this.http.get("https://publish.twitter.com/oembed?url=https://twitter.com/"+tweet.user.screen_name+"/status/"+tweet.id);
	}

	getTweetsByRest(player:String,team:String,author:String,player_team_op:String,team_author_op:String){
		return this.http.get(this.url+"/getTweetsByRest?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op);
	}

	getTweetsFromDb(player:String,team:String,author:String,player_team_op:String,team_author_op:String){
		return this.http.get(this.url+"/getTweetsFromDb?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op);
	}

	getFrequency(player: String, team: String , author: String, player_team_op: String, team_author_op: String){
		return this.http.get(this.url+"/frequency?player="+player+"&team="+team+"&author="+author+"&player_team_op="+player_team_op+"&team_author_op="+team_author_op);
	}

	emitButtomClickEvent(player: String,team: String, author: String, useDb:boolean, player_team_op: String, team_author_op:String){
		var info = new eventInfo(player,team,author,useDb,player_team_op,team_author_op);
		this.buttonClickEmitter.emit(info);
		console.log(info);
	}


	LoadScript() : Observable<any> {
        let that = this;

		return Observable.create(observer => 
		{
            //START LOADING SCRIPT INTO DOM
            that.startScriptLoad();

            //WHEN TWITTER WIDGETS SCRIPT IS LOADED, THEN PASS ALONG....
            window['twttr'].ready
            (
                function onLoadTwitterScript(twttr) 
                {
                    observer.next(twttr);
                    observer.complete();
                }
            ); 
        });
    };


    private startScriptLoad() 
    {
        window['twttr'] = (function(d, s, id, url) 
        {
            var js, 
                fjs = d.getElementsByTagName(s)[0],
                t = window['twttr'] || {};

            if (d.getElementById(id)) return t;

            js = d.createElement(s);
            js.id = id;
            js.src = url;
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            
            t.ready = function(f) 
            {
                t._e.push(f);
            };

            return t;
        }(document, "script", this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
    }   
}
