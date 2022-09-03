import { StatusCodeResponse } from '../Response/Response.model'

export const StatusCode: { [key in ErrorName]: StatusCodeResponse } = {
  badRequest: 400,
  notFound: 404,
  forbidden: 403,
  unauthorized: 401,
  serverError: 500,
  ok: 200,
  created: 201,
  noContent: 204,
}

export type ErrorName =
  | 'badRequest'
  | 'notFound'
  | 'forbidden'
  | 'unauthorized'
  | 'serverError'
  | 'ok'
  | 'created'
  | 'noContent'

export interface IFirebaseError {
  readonly code: string
  readonly message: string
}
