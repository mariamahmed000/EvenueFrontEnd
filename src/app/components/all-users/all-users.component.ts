import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  allUsers: { _id: string; name: string; email: string }[] = [];
  constructor(private _AdminService: AdminServiceService) {}
  ngOnInit(): void {
    this._AdminService.getAllUsers().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.allUsers = res.data;
        }
      },
    });
  }
  deleteUser(id:string){
    this._AdminService.deleteUser(id).subscribe({
      next:(res)=>{
        if(res.message=='success'){
          this._AdminService.getAllUsers().subscribe({
            next: (res) => {
              if (res.message == 'success') {
                this.allUsers = res.data;
              }
            },
          });
        }
      }
    });

  }
}
