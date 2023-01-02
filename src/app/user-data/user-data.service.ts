import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../authresponse';
import { UserSesionStorageService } from '../user-sesion-storage-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiServerUrl = environment.apiBaseUrl;
  private readonly USER_PATH: string = '/aa_test/aa_admin';

  constructor(private http: HttpClient,
    private sessionStorageService: UserSesionStorageService) { }

  public usertest(): Observable<HttpResponse<any>> {

    const response =  this.http.get(`${this.apiServerUrl}${this.USER_PATH}`, { 'headers': this.prepareHeaders(), responseType: 'text', observe: 'response'});
    console.log(response);
    return response;
  }

  private prepareHeaders(): HttpHeaders {
    const authResp: AuthResponse = this.sessionStorageService.getSessionUser();
    let httpHeaders: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + authResp.token);
    return httpHeaders;
  }

  public getUserName(): string {
    const authResp: AuthResponse = this.sessionStorageService.getSessionUser();
    return authResp.username;
  }

  public getUserRoles(): string[] {
    const authResp: AuthResponse = this.sessionStorageService.getSessionUser();
    return authResp.roles;
  }
}
