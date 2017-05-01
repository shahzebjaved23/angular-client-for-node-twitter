import { Component, OnInit, ViewChild } from '@angular/core';
import { TweetsService } from "../tweets.service";
import { eventInfo } from "../eventInfo.model";
import * as $ from "jquery";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private tweetservice : TweetsService) { }

  @ViewChild("player") player;
  @ViewChild("team") team;
  @ViewChild("author") author;

  ngOnInit() {
  }

  onClickGetTransfers(){
  	var nplayer = $(this.player.nativeElement).val();
  	var nteam = $(this.team.nativeElement).val();
  	var nauthor = $(this.author.nativeElement).val();
  	
  	console.log(nplayer);
  	console.log(nteam);
  	console.log(nauthor);

  	this.tweetservice.emitButtomClickEvent(nplayer,nteam,nauthor);
  }

}
