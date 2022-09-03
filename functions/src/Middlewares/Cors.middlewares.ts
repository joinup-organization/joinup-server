import cors from 'cors'
import * as functions from 'firebase-functions'

import { IFirebaseFunction, IResponse } from '../Response/Response.model'

const corsHandler = cors({ origin: true })

export const corsMiddleware = (fn: IFirebaseFunction) => {
  return (req: functions.https.Request, res: functions.Response<IResponse<void>>) => {
    return corsHandler(req, res, (error?) => {
      if (error) {
        return res.status(401).send({
          message: 'Não autorizado',
          status: false,
        })
      }

      return fn(req, res)
    })
  }
}
