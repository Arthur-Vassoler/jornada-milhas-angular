import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuario } from 'src/app/core/types/types';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()

    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuario;

      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.log('Erro ao realizar cadastro', err)
        }
      })
    }

  }
}
