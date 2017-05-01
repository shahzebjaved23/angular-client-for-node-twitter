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

	this.tweetservice.getFrequency().subscribe( (frequency)=>{
		let response = frequency.json();
		this.frequency = response.map(function(freq){
			return freq.count
		});

		this.labels = response.map(function(lab){
			return lab._id.day
		})

		console.log(this.frequency);

		this.data = {
			labels: this.labels.reverse(),
			datasets: [
				{
				  label: "Days of month",
				  data: this.frequency.reverse()
				}
			]
		};
	} )
	
	
	this.options = {
		responsive: true,
		maintainAspectRatio: false
	};
	
  }

}
