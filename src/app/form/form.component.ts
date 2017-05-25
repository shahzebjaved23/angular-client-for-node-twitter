import { Component, ElementRef ,ViewChild, OnInit } from '@angular/core';
import { TweetsService } from "../tweets.service";
import { eventInfo } from "../eventInfo.model";
import * as $ from "jquery";
import { playersource } from "../playersource";
import { teamsource } from "../teamsource";


declare var jQuery: any;



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private tweetservice : TweetsService) { }

  private playerSource = playersource; 
  private teamSource = teamsource ;
  

  @ViewChild('playerInput') playerInput: ElementRef;
  @ViewChild('teamInput') teamInput: ElementRef;
  @ViewChild("error") error: ElementRef;

  @ViewChild("mainRow") teammainRow: ElementRef;
  @ViewChild("textInput") teamtextInput: ElementRef;
  @ViewChild("chipsDiv") teamchipsDiv: ElementRef;

  @ViewChild("mainRow") playermainRow: ElementRef;
  @ViewChild("textInput") playertextInput: ElementRef;
  @ViewChild("chipsDiv") playerchipsDiv: ElementRef;

  useDb: boolean = false ;
  player: string = "some" ;
  team: string = "eoms";
  players: string[] = [];
  teams:string[] = [];
  author: string = "";
  authors: string[] = [];
  player_team_op: string = "AND";
  team_author_op: string = "AND";
  tags:string[] = ['AngularJS','Angluar2'];
  typeplayer: string = "typeplayer";
  typeteam: string = "typeteam";
  typeauthor: string = "typeauthor";
  Player = "Player";
  Team = "Team";
  Author = "Author";
  teamcount:number = 0;
  playercount:number = 0;
  eventplayers;
  eventteams;
  eventauthors;

  getPlayers(event){
      this.eventplayers = event;
      console.log(this.eventplayers)
  }

  getTeams(event){
      this.eventteams = event;
      console.log(this.eventteams);
  }

  getAuthors(event){
      this.eventauthors = event;
  }

  ngOnInit(){ }
 
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
    // if(this.player == "" && this.team == ""){
    //   $(this.error.nativeElement).show();    
    // }else{
    //   $(this.error.nativeElement).hide();
    //   this.tweetservice.emitButtomClickEvent(this.eventplayers,this.eventteams,this.author,this.useDb,this.player_team_op,this.team_author_op);
    // }

    // if(this.player == "" && this.team == ""){
    //   $(this.error.nativeElement).show();    
    // }else{
    //   $(this.error.nativeElement).hide();
      this.tweetservice.emitButtomClickEvent(this.eventplayers,this.eventteams,this.eventauthors,this.useDb,this.player_team_op,this.team_author_op);
    // }
     
  }

}
