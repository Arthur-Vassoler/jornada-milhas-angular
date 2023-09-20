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