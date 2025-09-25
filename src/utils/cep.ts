import axios from 'axios'

export type ViaCep = {
  logradouro: string
  bairro: string
  localidade: string // cidade
  uf: string
  erro?: boolean
}

export async function fetchAddressByCep(rawCep: string): Promise<ViaCep | null> {
  const cep = (rawCep || '').replace(/\D/g, '') // só números
  if (cep.length !== 8) return null
  const { data } = await axios.get<ViaCep>(`https://viacep.com.br/ws/${cep}/json/`)
  if ((data as any).erro) return null
  return data
}
