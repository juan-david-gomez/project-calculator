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

    //Valor a requerido de cuota inicial
    let project_initial_payment = objectFrom.project.price * objectFrom.project.initial_payment;
    //Precio del proyecto
    let project_price = parseInt(objectFrom.project.price);
    //Valor total a financiar
    let project_financing_amount = project_price - project_initial_payment;
    
    //Presupuesto del comprador
    let user_initial_payment = parseInt(this.user.budget);

    //Valor de interes Mensual
    let form_monthly_interest = objectFrom.annual_rate / 12;
    //Numero de meses a pagar valor financiado
    let form_months_number = parseInt(objectFrom.term);

    //Valor Neto a pagar por cada mes
    let monthly_amount = project_financing_amount / form_months_number;
    //Valor a pagar por el Interes mensual
    let monthly_interest = monthly_amount * form_monthly_interest;

    //Verifica si el presupuesto del comprador es suficiente
    let have_initial_payment = user_initial_payment >= project_initial_payment;
    //Se calcula el valor restante en caso que no sea suficiente
    let diff_user_project_initial = project_initial_payment - user_initial_payment;

    this.tableInfo.project = objectFrom.project;
    this.tableInfo.active=true;
    this.tableInfo.initial_payment = user_initial_payment;
    this.tableInfo.financing_amount = project_financing_amount;
    this.tableInfo.initial_installment = (have_initial_payment)?0:diff_user_project_initial;
    this.tableInfo.monthly_payments = [];
    

    for (let i = 0; i < form_months_number; i++) {
      let initialDate = new Date();
      //adiciona un mes de acuerdo al numero de la cuota
      initialDate.setMonth(initialDate.getMonth()+i);
      let payment = {
          date : this.spanishDate(initialDate),
          amount: monthly_amount + monthly_interest,//se suma el valor neto con el valor de interes
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
