import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface LoginInputs {
  email: string,
  senha: string
}

interface AuthResponse {
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(login: LoginInputs): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      login,
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        const authToken = response.body?.access_token || '';

        this.userService.saveToken(authToken);
      })
    );
  }
}
