import { Component, OnInit , Input, ViewChild, ViewEncapsulation} from '@angular/core';
import { TweetsService } from "../tweets.service";
import * as $ from "jquery";
import * as moment from "moment";
import { Ng2TweetService } from 'ng2-tweet/lib/index';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [TweetComponent],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  @Input() tweet : any;
  @ViewChild('text') text;
  @ViewChild('embedTweet') embedTweet;
  @ViewChild('tweet_container') tweet_container;
  @ViewChild("tweet_div") tweet_div;
  
  private linkPreview: any;
  private showLink : boolean = false;
  
  constructor(private tweetservice: TweetsService,private ng2TweetService: Ng2TweetService) { }

  ngOnInit() {
     console.log(this.tweet.user.screen_name);

  	$(this.text.nativeElement).html(this.linkify(this.tweet.text))
    this.tweet.created_at = moment(this.tweet.created_at).fromNow();

    // this.tweetservice.getEmbedTweet(this.tweet).subscribe((response)=>{
    //   console.log(response.json());
    // })

   
    var urls = this.tweet.text.match(/(\b(https|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim);

    if(urls != null){
      this.tweetservice.getLinkPreview(urls[0]).subscribe((data)=>{
        this.linkPreview = data.json().preview;
        if(this.linkPreview.images){
          this.showLink = this.linkPreview.images[0] != null;  
        }
      });  
    }
                
// https://publish.twitter.com/oembed?url=https://twitter.com/"+this.tweet.user.screen_name+"/statuses/"+this.tweet.id
// https://api.twitter.com/1.1/statuses/oembed.json?id=

  // this.tweetservice.getOmbed("https://publish.twitter.com/oembed?url=https://twitter.com/"+this.tweet.user.screen_name+"/statuses/"+this.tweet.id).subscribe((data)=>{
  //   console.log(data);
  // })

  //  this.tweetservice.getEmbedTweet(this.tweet).subscribe((data)=>{
  //   console.log(data);
  // })

  //  this.tweetservice.getOmbed("https://twitter.com/"+this.tweet.user.screen_name+"/statuses/"+this.tweet.id).subscribe((data)=>{
  //   console.log(data.json());
  // })

    
    // $.ajax({
    //   url: "https://api.twitter.com/1.1/statuses/oembed.json?id="+this.tweet.id,
    //   dataType: "jsonp",
    //   success: (data)=>{
    //     console.log(data);
    //     console.log(this.tweet_div);
    //     $(this.tweet_div.nativeElement).html(data.html);
    //   }
    // });
  }

   // ngAfterViewInit () {
   //   console.log(window["twttr"]);
   //   window["twttr"].widgets.createTweet(this.tweet.id, document.getElementById("tweet_container"), {});
   //   this.ng2TweetService.LoadScript().subscribe(
   //    //SUCCESS, WE HAVE TWITTER WIDGETS JS FILE LOADED...
   //    twttr =>
   //    {
   //      let nativeElement = this.tweet_container.nativeElement;

   //      console.log(window["twttr"]);

   //      window["twttr"].widgets.createTweet(this.tweet.id, document.getElementById("tweet_container"), {}).then
   //      (
   //        function success(embed) 
   //        {
   //          console.log('Created tweet widget: ', embed);
   //        } 
   //      ).catch
   //      (
   //        function creationError(message) 
   //        {
   //          console.log('Could not create widget: ', message);
   //        }
   //      );        
   //    },

   //    //ERROR
   //    err =>
   //    {
   //      console.log('****  ERROR LOADING TWITTER WIDGET', err);
   //    },
      
   //    //COMPLETE
   //    () =>
   //    {
   //      console.log("complete");     
   //    }   )

    // !function(d,s,id){
    //             var js: any,
    //                 fjs=d.getElementsByTagName(s)[0],
    //                 p='https';
    //             if(!d.getElementById(id)){
    //                 js=d.createElement(s);
    //                 js.id=id;
    //                 js.src=p+"://platform.twitter.com/widgets.js";
    //                 fjs.parentNode.insertBefore(js,fjs);
    //             }
    //         }
    //         (document,"script","twitter-wjs");

    // var twitter = (!function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0],
    //   t = twitter || {};
    //   if (d.getElementById(id)) return t;
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "https://platform.twitter.com/widgets.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    
    //   t._e = [];
    //   t.ready = function(f) {
    //     t._e.push(f);
    //   };
    
    //   return t;
    // }(document, "script", "twitter-wjs"));

    // var twitter = !function(d,s,id){
    //             var js: any,
    //                 fjs=d.getElementsByTagName(s)[0],
    //                 p='https';
    //             if(!d.getElementById(id)){
    //                 js=d.createElement(s);
    //                 js.id=id;
    //                 js.src=p+"://platform.twitter.com/widgets.js";
    //                 fjs.parentNode.insertBefore(js,fjs);
    //             }
    //         }
    //         (document,"script","twitter-wjs");

    //         console.log(twitter);

    // twitter.widgets.createTweet(
    //       this.tweet.id,
    //       document.getElementById('tweet-container'),
    //       {
    //         theme: 'dark'
    //     });
  
  // }




  linkify(inputText: String){
		var replacedText, replacePattern1, replacePattern2, replacePattern3;

		//URLs starting with http://, https://, or ftp://
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

		//Change email addresses to mailto:: links.
		replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    var replacedmentions = this.linkify_at_mentions(replacedText);
    var replacedhash = this.linkify_hash_tags(replacedmentions);

    // console.log(replacedText)

		return replacedhash;
  }

  linkify_at_mentions(input:String){
    var replacePattern = /(^|\s|[^\w\d])@(\w+)/gim;
    var replacedText = input.replace(replacePattern,'$1<a href="http://domain.com/$2">@$2</a>') 
    return replacedText;
  } 

  linkify_hash_tags(input:String){
    var replacePatterns = /(^|\s|[^\w\d])#(\w+)/gim;
    var replacedText = input.replace(replacePatterns,'$1<a href="http://domain.com/$2">#$2</a>')
    return replacedText;
  }



}
