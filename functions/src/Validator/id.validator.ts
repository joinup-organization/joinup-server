import * as functions from 'firebase-functions'
import * as yup from 'yup'

import { IFirebaseFunction, IResponse } from '../Response/Response.model'

class IdValidator {
  public readonly getByIdValidator = (fn: IFirebaseFunction) => {
    return async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
      try {
        const schema = this.buildGetByIdValidator()
        await schema.validate(req.query)
        return fn(req, res)
      } catch (error) {
        const safeError = error as yup.ValidationError

        return res.status(400).send({
          status: false,
          errors: safeError.errors || ['Um ou mais parâmetros enviados estão inconsistentes'],
          message: 'Dados enviados inconsistentes',
        })
      }
    }
  }

  private readonly buildGetByIdValidator = () => {
    return yup.object().required().shape({
      id: yup.string().strict().required(),
    })
  }
}

export const { getByIdValidator } = new IdValidator()
