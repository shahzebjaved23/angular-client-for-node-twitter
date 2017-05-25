import { Component, ElementRef ,OnInit , ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { TweetsService } from "../tweets.service";
import { chipsInfo } from "../chipsInfo.model";

declare var jQuery: any;

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {


  @ViewChild("mainRow") mainRow: ElementRef;
  @ViewChild("textInput") textInput: ElementRef;
  @ViewChild("chipsDiv") chipsDiv: ElementRef;
  @Input() type:string;
  @Input() autocompleteSource;
  @Input() placeholder;
  
  @Output() bindModelDataChange: any = new EventEmitter<string>();
  

  private count : number = 0;

  constructor(private tweetservice: TweetsService) { }

	updateData(event) {
		var updatedData = this.updatedData();
		this.bindModelDataChange.emit(updatedData+" "+event);
	}

	updatedData(){
		var playersArr = [];
	  	$(this.chipsDiv.nativeElement).children().each((index,elem)=>{
	  		playersArr.push($(elem).text().replace("×",""));	
	  	});

	  	return playersArr.join(" ").replace("×","");
	}

  ngOnInit() {

  	if(this.autocompleteSource){
  			jQuery(this.textInput.nativeElement).autocomplete({
		      source: this.autocompleteSource
		    });	
  	}
  	

  	jQuery(this.mainRow.nativeElement).find('input').bind('keyup',(e)=>{
  		if(e.keyCode == 13){
  			this.count = this.count + 1;
  			var id = this.count + this.type;

  			console.log(id);
  			var inputVal = jQuery(this.textInput.nativeElement).val();
  			jQuery(this.chipsDiv.nativeElement).append("<span id='"+id+"' style='margin: 5px;background-color: #e0e0e0;border-radius: 10px;padding: 5px;font-family: 'Roboto', 'Helvetica Neue', sans-serif;font-size: 16px;height: 32px;line-height: 32px;display: inline-block;background: #e0e0e0;padding: 0 12px;border-radius: 90px;margin-right: 10px;transition: all 0.12s ease-out;'>"+inputVal+"<span style='border-radius: 50%;background: #a6a6a6;cursor: pointer;background: #a6a6a6;display: inline-block;font-size: 17px;height: 24px;line-height: 24px;margin-left: 6px;margin-right: -6px;text-align: center;width: 24px;' onclick='crossClicked("+JSON.stringify(id)+")'>×</span>"+"</span>");
  			jQuery(this.textInput.nativeElement).val("");
  		}
  	});  	
  }
}
