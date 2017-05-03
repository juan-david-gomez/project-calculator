import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() onSubmitFromCalculate = new EventEmitter<any>();
  @Input() user:any[];
  
  calculatorInfo:any;
  constructor() { 
    this.calculatorInfo = {
      project:{},
      annual_rate:'',
      term:''
    };

  }
  calculate(){
    this.onSubmitFromCalculate.emit(this.calculatorInfo);
  }

  ngOnInit() {
  }

}
