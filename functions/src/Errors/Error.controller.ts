import * as functions from 'firebase-functions'

import { IResponse } from '../Response/Response.model'

import { DefaultError } from './DefaultError'

export const errorController = <T>(error: any, res: functions.Response<IResponse<T>>) => {
  const safeError = error as DefaultError
  console.log(JSON.stringify(safeError, null, 2))

  return res.status(safeError.statusCode || 500).send({
    message: safeError.message,
    status: false,
  })
}
