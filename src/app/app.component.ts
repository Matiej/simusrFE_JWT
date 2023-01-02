import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthResponse } from './authresponse';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserSesionStorageService } from './user-sesion-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simusrFE-JWT';

  inputLoginPlaceHolder: string = 'wpisz login';
  inputPasswordPlaceHolder: string = 'wpisz haslo';
  loginFormular: FormGroup;
  invalidLogin: boolean = false;
  public response: AuthResponse;

  constructor(private router: Router,
    private authService: AuthService,
    private sessionStorageService: UserSesionStorageService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.loginFormular = new FormGroup({
      inputUsername: new FormControl(null, Validators.required),
      inputPassword: new FormControl(null, Validators.required),
    });
  }

  public submitLoginForm(): void {
    const login: string = this.loginFormular.value.inputPassword;
    const password: string = this.loginFormular.value.inputPassword;
    console.log(login);
    console.log(password);
    this.authService.authenticate(this.loginFormular).subscribe({
      next: (response: AuthResponse) => {
        console.log('MY RESPONSE FROM BACKEND');
        console.log(response);
        this.response = response;
        this.sessionStorageService.saveUserSesion(response);
        this.loginFormular.reset();

      },
      error: (err: HttpErrorResponse) => {
        console.log("Sumbmiting login request ERROR ===> " + err.message);
        console.error(err);
      }
    })
  }

  public getUserData(): AuthResponse {
    const sessionUser = this.sessionStorageService.getSessionUser();
    return sessionUser;
  }

  public isUserLogin(): boolean {
    return this.sessionStorageService.isUserLoggedIn();
  }

}
