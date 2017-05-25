import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartModule } from 'angular2-chartjs';
import { TweetsService } from "../tweets.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


	type;
	data;
	options;
	frequency;
	labels;
 

  @ViewChild('line') line: ElementRef;

  constructor(private tweetservice:TweetsService) { }

  ngOnInit() {

	this.type = 'line';

	this.tweetservice.buttonClickEmitter.subscribe((queryInfo)=>{
		this.frequency = null;
		this.labels = null;
		this.tweetservice.getFrequency(queryInfo.player.replace(" ","|").replace(","," ") , queryInfo.team , queryInfo.author, queryInfo.player_team_op, queryInfo.team_author_op ).subscribe( (frequency)=>{
			let response = frequency.json();
			console.log("frequency");
			console.log(response);
			this.frequency = response.map(function(freq){
				return freq.count
			});

			this.labels = response.map(function(lab){
				return lab._id.day
			})

			console.log(this.frequency);
			console.log(this.labels);

			this.data = {
				labels: this.labels,
				datasets: [
					{
					  label: "Days of month",
					  data: this.frequency
					}
				]
			};
		} )	
	})

	
	
	
	this.options = {
		responsive: true,
		maintainAspectRatio: false
	};
	
  }

}
