import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PessoaUsuario } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  cadastrar(pessoaUsuario: PessoaUsuario): Observable<PessoaUsuario> {
    return this.http.post<PessoaUsuario>(`${this.apiUrl}/auth/cadastro`, pessoaUsuario)
  }

  buscarCadastro(): Observable<PessoaUsuario> {
    return this.http.get<PessoaUsuario>(`${this.apiUrl}/auth/perfil`)
  }

  editarCadastro(pessoaUsuario: PessoaUsuario): Observable<PessoaUsuario> {
    return this.http.patch<PessoaUsuario>(`${this.apiUrl}/auth/perfil`, pessoaUsuario)
  }
}
