import * as functions from 'firebase-functions'
import * as yup from 'yup'

import { IFirebaseFunction, IResponse } from '../../Response/Response.model'

class EnrollVacancyValidator {
  public readonly enrollVacancyValidator = (fn: IFirebaseFunction) => {
    return async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
      try {
        const schema = this.buildEnrollVacancyValidator()
        await schema.validate(req.body)
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

  private readonly buildEnrollVacancyValidator = () => {
    return yup.object().required().shape({
      vacancyId: yup.string().strict().required(),
      userId: yup.string().strict().required(),
      projectId: yup.string().strict().required(),
    })
  }
}

export const { enrollVacancyValidator } = new EnrollVacancyValidator()
