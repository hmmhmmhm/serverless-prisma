import './core/prisma'

import * as router from 'aws-lambda-router'
import { getFileList, requireDefaults } from './core/static'

export const serverlessAlpha = router.handler({
  proxyIntegration: {
    routes: requireDefaults(
      getFileList(`${__dirname}/route`)
    ),
  },
})
