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

  useDb;

  @ViewChild("player") player;
  @ViewChild("team") team;
  @ViewChild("author") author;
  // @ViewChild("useDb") useDb;
  @ViewChild("source") source;

  ngOnInit() {
  }

  onClickGetTransfers(){
  	var nplayer = $(this.player.nativeElement).val();
  	var nteam = $(this.team.nativeElement).val();
  	var nauthor = $(this.author.nativeElement).val();
  	var nsource = $(this.source.nativeElement).val();
  	// var nuseDb = $(this.useDb.nativeElement).val();
  	
  	console.log(nplayer);
  	console.log(nteam);
  	console.log(nauthor);
  	console.log(nsource);
  	console.log(this.useDb);

  	this.tweetservice.emitButtomClickEvent(nplayer,nteam,nauthor,nsource,this.useDb);
  }

}
