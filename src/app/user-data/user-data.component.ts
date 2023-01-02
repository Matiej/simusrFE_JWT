import { Component, OnInit } from '@angular/core';
import { UserDataService } from './user-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit {
  public response: string = '';
  public isResponseReady: boolean = false;
  public isBadUnauthorizedResponse: boolean = false;
  public userName: string = '';
  public userRoles: string[] =[];

  constructor(private userservice: UserDataService) { }

  ngOnInit(): void {
    this.getAuthorizedUserResponse();
    this.userName = this.userservice.getUserName();
    this.userRoles = this.userservice.getUserRoles();
  }

  private getAuthorizedUserResponse(): void {
    this.userservice.usertest().subscribe({
      next: response => {
        this.response = response.body;
        this.isResponseReady = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error)
        this.response = err.error;
        this.isBadUnauthorizedResponse = true;
      }
    });
  }

}
