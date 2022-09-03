export interface IResponse<T> {
  readonly status: boolean
  readonly data?: T
  readonly message: string
  readonly showMessage?: boolean
  readonly errors?: string[]
}

export type StatusCodeResponse = 400 | 404 | 403 | 401 | 500 | 200 | 201 | 204

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFirebaseFunction = any

export const enum responseMessageDefault {
  get = 'Consulta realizada com sucesso',
  put = 'Atualização realizada com sucesso',
  post = 'Cadastro realizado com sucesso',
  delete = 'Exclusão realizada com sucesso',
  received = 'Dados recebidos',
}

type TShowMessagemMap = { [key in 'true' | 'false']: boolean }

export const showMessageMap: TShowMessagemMap = {
  true: true,
  false: false,
}

export interface IPaginationRequest {
  readonly page: number
  readonly pageSize: number
}

export interface IBaseRequestParams<T, K> {
  readonly query: T
  readonly body: K
}
