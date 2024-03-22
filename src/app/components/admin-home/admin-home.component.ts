import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { Reservation } from '../../interfaces/reservation';
import Chart from 'chart.js/auto';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { MyEvent } from '../../interfaces/my-event';
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule,ChartModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  allUsersNum?:Number;
  allEventsNum?:Number;
  allReservationNum?:Number;
  allResevations:Reservation[]=[]
  public chart: any;
  Slabel1=["number of Reservations"]
  reservationMonths:number[]=[];
  reservationPrices:Number[]=[];
  Llabel2="Total Prices";
  data: any;
  options: any;
  totalTickets:number=0;
  reservedTickets:number=0;
  Events:any;
  constructor(private _AdminService:AdminServiceService){}
  ngOnInit(): void {
  this._AdminService.getEvents().subscribe({
    next:(res)=>{
      if(res.message=="success"){
        this.allEventsNum=res.length;

        this.Events=res.data;
        this.Events=this.Events.map((event:any)=>event.tickets)

        this.getAllticketsNumbers(this.Events);
        this.getAllticketsReserved(this.Events);

      }
    }
  });
  this._AdminService.getAllUsers().subscribe({
    next:(res)=>{
      if(res.message=="success"){
        this.allUsersNum=res.length;
      }
    }
  });
  this._AdminService.getAllReservations().subscribe({
    next:(res)=>{
      if(res.message=="success"){
        this.allReservationNum=res.length;
        this.allResevations=res.data;
        console.log(this.allResevations);
        this.seperatePrices(this.allResevations);
        this.createReservationChart();
        this.createPieChart();
      }
    }
  });

  };

  seperatePrices(data:any){
    const monthTotals = new Map();
    data.forEach((item: { timestamp: string | number | Date; totalPrice: any; }) => {
      const timestamp = new Date(item.timestamp);
      const monthYear = timestamp.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      const totalPrice = item.totalPrice;
      if (monthTotals.has(monthYear)) {
        monthTotals.set(monthYear, monthTotals.get(monthYear) + totalPrice);
      } else {
        monthTotals.set(monthYear, totalPrice);
      }
    });

    this.reservationMonths = Array.from(monthTotals.keys());
    console.log(this.reservationMonths);

    this.reservationPrices= Array.from(monthTotals.values());
  }
getAllticketsNumbers(Events:any){
  for (let i = 0; i < Events.length; i++) {
    const currentArray = Events[i];
    for (let j = 0; j < currentArray.length; j++) {
      this.totalTickets+= parseInt(currentArray[j].totalTickets) ;

    }
  }

}
getAllticketsReserved(Events:any){
  for (let i = 0; i < Events.length; i++) {
    const currentArray = Events[i];
    for (let j = 0; j < currentArray.length; j++) {
      this.reservedTickets+= parseInt(currentArray[j].reserved) ;

    }
  }


}
  createReservationChart() {

    this.chart = new Chart('bar', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels:this.reservationMonths,

        datasets: [
          {
            label: 'Total Revenue',
            data: this.reservationPrices,
            backgroundColor: '#8e3a9d',
            borderWidth: 0,
            barPercentage: 0.5, // Adjust the width of the bars (0.5 means half of the available space)
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // Disable aspect ratio to control canvas size directly
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createPieChart(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
        labels: ['Total Tickets', 'Reserved Tickets'],
        datasets: [
            {
                data: [this.totalTickets, this.reservedTickets],
                backgroundColor: ['#333', '#7C3488'],


            }
        ]
    };

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
}

}
