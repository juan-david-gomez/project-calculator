import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:any;
  tableInfo:any;
  title = 'app works!';
  
  constructor() { 
    this.user = {
      name:'Juan David',
      budget:'100000000',
      favorites:[
        {
          name:'Casas del Portal',
          initial_payment:'0.30',
          price:"250000000"
        },
        {
          name:'Proyecto 1',
          initial_payment:'0.30',
          price:"350000000"
        },
        {
          name:'Proyecto 2',
          initial_payment:'0.30',
          price:"150000000"
        }
      ]
    };
    this.tableInfo = {
      active:false,
      initial_payment:'',
      initial_installment:'',
      financing_amount:'',
      monthly_payments:[]
    };

  }
  calculate(objectFrom){
    let project_initial_payment = objectFrom.project.price * objectFrom.project.initial_payment;
    let project_price = parseInt(objectFrom.project.price);
    let project_financing_amount = project_price - project_initial_payment;
    

    let user_initial_payment = parseInt(this.user.budget);

    let form_monthly_interest = objectFrom.annual_rate / 12;
    let form_months_number = parseInt(objectFrom.term);


    let monthly_amount = project_financing_amount / form_months_number;
    let monthly_interest = monthly_amount * form_monthly_interest;

    let have_initial_payment = user_initial_payment >= project_initial_payment;
    let diff_user_project_initial = project_initial_payment - user_initial_payment;

    this.tableInfo.project = objectFrom.project;
    this.tableInfo.active=true;
    this.tableInfo.initial_payment = user_initial_payment;
    this.tableInfo.financing_amount = project_financing_amount;
    this.tableInfo.initial_installment = (have_initial_payment)?0:diff_user_project_initial;
    this.tableInfo.monthly_payments = [];
    

    for (let i = 0; i < form_months_number; i++) {
      let initialDate = new Date();
      initialDate.setMonth(initialDate.getMonth()+i);
      let payment = {
          date : this.spanishDate(initialDate),
          amount: monthly_amount + monthly_interest,
          installment: i + 1
      };
      this.tableInfo.monthly_payments.push(payment);      
    }

    console.log(this.tableInfo);

  }

  spanishDate(d){
    let weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    let monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return weekday[d.getDay()]+" "+d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear()
  }
}
