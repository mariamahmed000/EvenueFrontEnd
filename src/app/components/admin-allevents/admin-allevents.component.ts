import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { MyEvent } from '../../interfaces/my-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-allevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-allevents.component.html',
  styleUrl: './admin-allevents.component.css'
})
export class AdminAlleventsComponent  implements OnInit {
  allEvents:MyEvent[] = [];
  constructor(private _AdminService: AdminServiceService) {}
  ngOnInit(): void {
    this._AdminService.getEvents().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.allEvents = res.data;
          console.log(this.allEvents);

        }
      },
    });
  }
  deleteEvent(id:string){
    this._AdminService.deleteEvent(id).subscribe({
      next:(res)=>{
        if(res.message=='success'){
          this._AdminService.getEvents().subscribe({
            next: (res) => {
              if (res.message == 'success') {
                this.allEvents = res.data;
              }
            },
          });
        }
      }
    });

  }
}
