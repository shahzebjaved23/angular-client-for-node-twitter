import { Component, OnInit , Input, ViewChild, ViewEncapsulation} from '@angular/core';
import { TweetsService } from "../tweets.service";
import * as $ from "jquery";
import * as moment from "moment";


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


  constructor(private tweetservice: TweetsService) { }

  ngOnInit() {
  	$(this.text.nativeElement).html(this.linkify(this.tweet.tweet.text))
    this.tweet.created_at = moment(this.tweet.created_at).fromNow();
  }

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
    console.log(replacedText)
    return replacedText;
  } 

  linkify_hash_tags(input:String){
    var replacePatterns = /(^|\s|[^\w\d])#(\w+)/gim;
    var replacedText = input.replace(replacePatterns,'$1<a href="http://domain.com/$2">#$2</a>')
    return replacedText;
  }



}
