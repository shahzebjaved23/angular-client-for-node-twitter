import { Component, ElementRef ,OnInit , ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { TweetsService } from "../tweets.service";
import { chipsInfo } from "../chipsInfo.model";

declare var jQuery: any;

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})

/*
* This is a resuable custom component that provides the chips functionality
*/ 

export class ChipsComponent implements OnInit {


  /*
  * Element references 
  */
  @ViewChild("mainRow") mainRow: ElementRef;
  @ViewChild("textInput") textInput: ElementRef;
  @ViewChild("chipsDiv") chipsDiv: ElementRef;
  
  /*
  * Inputs into the component
  */
  @Input() type:string;
  @Input() autocompleteSource;
  @Input() placeholder;
  
  /*
  * the output emits the data of the text input
  */
  @Output() bindModelDataChange: any = new EventEmitter<string>();
  

  private count : number = 0;

  constructor(private tweetservice: TweetsService) { }

  /*
  * called automatically when the data in the text input changes
  * called manually when chipified
  */
	updateData(event) {
		var updatedData = this.updatedData();
    if(event != ""){
      this.bindModelDataChange.emit(updatedData+" "+event);  
    }else{
      this.bindModelDataChange.emit(updatedData);
    }
	}

  /*
  * get data from the chips and returns a space seperated string
  * spaces within the chips are replaced by ','
  */
	updatedData(){
		var playersArr = [];
	  $(this.chipsDiv.nativeElement).children().each((index,elem)=>{
	  	playersArr.push($(elem).text().replace("×","").replace(" ",",").replace(" ",","));	
	  });
    console.log("inside the updated data function")
	  return playersArr.join(" ");
	}

  /*
  * gets the text from the input and turns into chips
  */
  chipify(){
    var inputVal = jQuery(this.textInput.nativeElement).val();
    if(inputVal.replace(/s/,"") != ""){
      this.count = this.count + 1;
      var id = this.count + this.type;
      console.log(id); 
      jQuery(this.chipsDiv.nativeElement).append("<span id='"+id+"' style='margin: 5px;background-color: #e0e0e0;border-radius: 10px;padding: 5px;font-family: 'Roboto', 'Helvetica Neue', sans-serif;font-size: 16px;height: 32px;line-height: 32px;display: inline-block;background: #e0e0e0;padding: 0 12px;border-radius: 90px;margin-right: 10px;transition: all 0.12s ease-out;'>"+inputVal+"<span style='border-radius: 50%;background: #a6a6a6;cursor: pointer;background: #a6a6a6;display: inline-block;font-size: 17px;height: 24px;line-height: 24px;margin-left: 6px;margin-right: -6px;text-align: center;width: 24px;' onclick='crossClicked("+JSON.stringify(id)+")'>×</span>"+"</span>");
      jQuery(this.textInput.nativeElement).val("");
      this.updateData("");  
    }
  }

  /* called in component init */
  ngOnInit() {

     /* 
    * subscribe to the request chipify event emitter, 
    * call chipify when requested , 
    * emit chipified event when done 
    */ 
    this.tweetservice.requestChipifyEmitter.subscribe(()=>{
      this.chipify();
      this.updateData(""); 
      this.tweetservice.emitChipified();
    })

    /* attach the autocomplete to the text input, supplied by parent component */
  	if(this.autocompleteSource){
  			jQuery(this.textInput.nativeElement).autocomplete({
		      source: this.autocompleteSource
		    });	
  	} 

    /* bind the keyup event to text input, call chipify if the key is enter */ 
    jQuery(this.mainRow.nativeElement).find('input').bind('keyup',(e)=>{
      if(e.keyCode == 13){ // key code for enter
        this.chipify();
      }
    });
  }
}
