import { prisma } from '../core/prisma'
import { createRoute } from '../core/route'

const getUserData = async () => {
  let userData = await prisma.user.findFirst({
    where: {
      email: 'test@test.com',
    },
  })

  if (!userData) {
    userData = await prisma.user.create({
      data: {
        email: 'test@test.com',
        name: 'User Test',
      },
    })
  }

  return userData
}

export default createRoute<{ text: string }>({
  path: '/hello',
  method: 'POST',
  action: (request, context) => {
    return `You called me with: ${request.body.text} ${getUserData()}`
  },
})
