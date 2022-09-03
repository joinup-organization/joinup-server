import { StatusCodeResponse } from '../Response/Response.model'

import { StatusCode } from './Error.model'

export class DefaultError extends Error {
  constructor(public message: string, public statusCode: StatusCodeResponse) {
    super(message)

    this.name = this.getErrorNameByStatusCode(statusCode)

    Object.setPrototypeOf(this, DefaultError.prototype)
  }

  private readonly getErrorNameByStatusCode = (statusCode: StatusCodeResponse) => {
    const entries = Object.entries(StatusCode).find(([key, value]) => value === statusCode)

    if (!entries) {
      return 'Erro desconhecido'
    }

    const [errorName] = entries

    return errorName
  }
}
