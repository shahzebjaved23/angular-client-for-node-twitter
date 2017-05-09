import { Component, ViewChild } from '@angular/core';
import { TweetsService } from "../tweets.service";
import { eventInfo } from "../eventInfo.model";
import * as $ from "jquery";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private tweetservice : TweetsService) { }

  useDb: boolean = false ;
  player: string = "" ;
  team: string = "";
  author: string = "";
  player_team_op: string = "AND";
  team_author_op: string = "AND";
 

  onClickGetTransfers(){
  	this.tweetservice.emitButtomClickEvent(this.player,this.team,this.author,this.useDb,this.player_team_op,this.team_author_op);
  }

}
