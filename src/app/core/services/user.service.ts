import { Injectable } from '@angular/core'
import { TokenService } from './token.service'
import { BehaviorSubject } from 'rxjs'
import { PessoaUsuario } from '../types/types'
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<PessoaUsuario | null>(null)

  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeJwt()
    }
  }

  decodeJwt() {
    const token = this.tokenService.returnToken()
    const user = jwt_decode(token) as PessoaUsuario

    this.userSubject.next(user)
  }

  returnUser() {
    return this.userSubject.asObservable()
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token)
    this.decodeJwt()
  }

  logout() {
    this.tokenService.deleteToken()
    this.userSubject.next(null)
  }

  statusLogged() {
    return this.tokenService.hasToken()
  }
}
