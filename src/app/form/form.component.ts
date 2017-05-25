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
  players: string[] = [];
  teams:string[] = [];
  author: string = "";
  authors: string[] = [];
  player_team_op: string = "AND";
  team_author_op: string = "AND";
  tags:string[] = ['AngularJS','Angluar2'];


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

    // Parse teams, to remove spaces
    var newTeams = [];
    this.teams.forEach(function(team){
      newTeams.push(team.replace(" ",""))
    })
    this.team = newTeams.join(" ");

    // parse players to remove ',' and empty spaces
    var newPlayers = []; 
    this.players.forEach(function(player){
      newPlayers.push(player.replace(",","").replace(" ",","));
    })
    this.player = newPlayers.join(" ");

    // parse authors to remove empty spaces
    var newAuthors = [];
    this.authors.forEach(function(author){
      newAuthors.push(author.replace(" ",""));
    })
    this.author = newAuthors.join(" ");

    // if players and team both empty then show error msg, else emit button click event
    if(this.player == "" && this.team == ""){
      $(this.error.nativeElement).show();    
    }else{
      $(this.error.nativeElement).hide();
      this.tweetservice.emitButtomClickEvent(this.player,this.team,this.author,this.useDb,this.player_team_op,this.team_author_op);
    }
  }

}
