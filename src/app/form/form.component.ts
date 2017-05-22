import { Component, ViewChild, OnInit } from '@angular/core';
import { TweetsService } from "../tweets.service";
import { eventInfo } from "../eventInfo.model";
import * as $ from "jquery";
import { playersource } from "../playersource";
import { teamsource } from "../teamsource";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private tweetservice : TweetsService) { }

  private playerSource = playersource; 
  private teamSource = teamsource ;


  @ViewChild('playerInput') playerInput;
  @ViewChild('teamInput') teamInput;
  @ViewChild("error") error;

  useDb: boolean = false ;
  player: string = "" ;
  team: string = "";
  author: string = "";
  player_team_op: string = "AND";
  team_author_op: string = "AND";


  ngOnInit(){

    // $(this.playerInput.nativeElement).keyup((e)=>{
    //   this.tweetservice.getPlayerAutoComplete(this.player).subscribe((response)=>{
    //     this.playerSource = response.json();
    //   })
    // });

    // $(this.teamInput.nativeElement).keyup(()=>{
    //   this.tweetservice.getTeamAutoComplete(this.team).subscribe((response)=>{
    //     this.teamSource = response.json();
    //   });
    // });

  }
 

  onClickGetTransfers(){

    if(this.player == "" && this.team == ""){
      $(this.error.nativeElement).show();    
    }else{
      $(this.error.nativeElement).hide();
      this.tweetservice.emitButtomClickEvent(this.player,this.team,this.author,this.useDb,this.player_team_op,this.team_author_op);
    }
  }

}
