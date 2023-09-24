import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { UnidadeFederativa } from 'src/app/core/types/types'
import { DateAdapter } from '@angular/material/core'
import { FormularioService } from 'src/app/core/services/formulario.service'

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit {
  @Input() titulo: string = 'Crie Sua Conta'
  @Input() textoBotao: string = 'ADICIONAR'
  @Input() perfilComponent: boolean = false
  @Output() acaoClick: EventEmitter<any> = new EventEmitter<any>
  @Output() sair: EventEmitter<any> = new EventEmitter<any>
  
  cadastroForm!: FormGroup
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required)

  constructor (
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale('pt-BR')

    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null],
      cpf: [null, Validators.required],
      cidade: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      estado: this.estadoControl,
      confirmarEmail: [null, [Validators.required, Validators.email]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [null, Validators.requiredTrue]
    }, { validators: [this.senhaValidator, this.emailValidator] })

    if (this.perfilComponent)
      this.cadastroForm.get('aceitarTermos')?.setValidators(null)
    else
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue])

    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity()

    this.formularioService.setCadastro(this.cadastroForm)
  }

  emailValidator = (control: AbstractControl) => {
    const email = control.get('email')
    const confirmarEmail = control.get('confirmarEmail')

    if (email && confirmarEmail) {
      if (email.value !== confirmarEmail.value)
        confirmarEmail.setErrors({ emailsNaoSaoIguais: true })
      else
        if (confirmarEmail.hasError('emailsNaoSaoIguais'))
          confirmarEmail.setErrors(null)
    }

    return null
  }

  senhaValidator = (control: AbstractControl) => {
    const senha = control.get('senha')
    const confirmarSenha = control.get('confirmarSenha')

    if (senha && confirmarSenha) {
      if (senha.value !== confirmarSenha.value)
        confirmarSenha.setErrors({ senhasNaoSaoIguais: true })
      else
        if (confirmarSenha.hasError('senhasNaoSaoIguais'))
          confirmarSenha.setErrors(null)
    }

    return null
  }

  executarAcao() {
    this.acaoClick.emit()
  }

  logout() {
    this.sair.emit()
  }
}
