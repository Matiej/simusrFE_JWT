import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from './authRequest';
import { AuthResponse } from './authresponse';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UserSesionStorageService } from './user-sesion-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private readonly LOGIN_PATH: string = '/users/login';

  constructor(private http: HttpClient,
    private sessionStorageService: UserSesionStorageService) { }

  public authenticate(form: FormGroup): Observable<AuthResponse> {
    const request: AuthRequest = this.toAuthRequest(form);
    console.log(request);
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post<AuthResponse>(`${this.apiServerUrl}${this.LOGIN_PATH}`,
      request, { 'headers': httpHeaders });
  }

  private toAuthRequest(form: FormGroup): AuthRequest {
    return {
      username: form.get('inputUsername')?.value,
      password: form.get('inputPassword')?.value,
    };
  }
}
