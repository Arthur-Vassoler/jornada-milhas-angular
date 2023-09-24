export interface Promocao {
  id: number
  destino: string
  imagem: string
  preco: number
}

export interface UnidadeFederativa {
  toLowerCase(): unknown
  id: number
  nome: string
  sigla: string
}

export interface PessoaUsuario {
  nome: string,
  nascimento: string,
  cpf: string,
  telefone: string,
  email: string,
  senha: string,
  genero: string,
  cidade: string,
  estado: UnidadeFederativa
}