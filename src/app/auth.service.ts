import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from './authRequest';
import { AuthResponse } from './authresponse';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private readonly LOGIN_PATH: string = '/users/login';

  constructor(private http: HttpClient) { }

  public authenticate(form: FormGroup): Observable<AuthResponse> {
    const request: AuthRequest = this.toAuthRequest(form);
    console.log(request);
    return this.http.post<AuthResponse>(`${this.apiServerUrl}${this.LOGIN_PATH}`,
      request, httpOptions);
  }

  private toAuthRequest(form: FormGroup): AuthRequest {
    return {
      username: form.get('inputUsername')?.value,
      password: form.get('inputPassword')?.value,
    };
  }
}
