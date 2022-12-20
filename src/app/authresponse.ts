export class AuthResponse {
  private _userId: number;
  private _username: string;
  private _roles: string[];
  private _token: string;

  public get userId(): number {
    return this._userId;
  }

  public get username(): string {
    return this._username;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public get token(): string {
    return this._token;
  }

}
