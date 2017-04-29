import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-playerinfo',
  templateUrl: './playerinfo.component.html',
  styleUrls: ['./playerinfo.component.css']
})
export class PlayerinfoComponent implements OnInit {

  @Input() name;
  @Input() dateofbirth;
  @Input() country;
  @Input() position;
  @Input() height; 

  constructor() { }

  ngOnInit() {
  }

}
