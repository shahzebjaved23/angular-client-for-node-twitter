import { Component, OnInit , Input} from '@angular/core';
import { TweetsService } from "../tweets.service";

@Component({
  selector: 'app-playerinfo',
  templateUrl: './playerinfo.component.html',
  styleUrls: ['./playerinfo.component.css']
})
export class PlayerinfoComponent implements OnInit {

  public playerInfo : any;

  constructor(private tweetservice: TweetsService) { }

  ngOnInit() {
    this.tweetservice.buttonClickEmitter.subscribe((queryInfo)=>{
      this.playerInfo = null;
      if(queryInfo.player != ""){
        this.tweetservice.getPlayerInfo(queryInfo.player.replace(" ","|").replace(","," ")).subscribe((playerInfo)=>{
          this.playerInfo = playerInfo.json();
          console.log(this.playerInfo);
        });  
      }
    })
  }  

}
