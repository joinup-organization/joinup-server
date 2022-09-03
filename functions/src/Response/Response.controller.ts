import * as functions from 'firebase-functions'

import { IResponse } from './Response.model'

export const responseController = <T>(
  res: functions.Response<IResponse<T>>,
  message?: string,
  showMessage?: boolean,
  data?: T,
) => {
  const safeMessage = message ?? 'Concluído com sucesso'

  return res.status(200).json({
    message: safeMessage,
    showMessage,
    status: true,
    data,
  })
}
