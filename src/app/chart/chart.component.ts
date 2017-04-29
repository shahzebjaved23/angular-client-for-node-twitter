import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import * as ChartConfiguration from 'chart.js'
// import Chart = require("chart.js");

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

 

  @ViewChild('line') line: ElementRef;

  constructor() { }

  ngOnInit() {
    let lineCtx = this.line.nativeElement.getContext('2d');

    var data = {
        labels: [
            "Value A",
            "Value B"
        ],
        datasets: [
            {
                data: [101342, 55342],   // Example data
                backgroundColor: [
                    "#1fc8f8",
                    "#76a346"
                ]
            }]
    };

    var chart = new Chart(lineCtx,
	        {
	            type: 'doughnut',
	            data: data,
	            options: {
	                cutoutPercentage: 50
	            }
	        }
    	);
   }

}
