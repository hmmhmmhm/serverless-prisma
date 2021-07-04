import { createRoute } from '../../core/route'

export default createRoute({
  path: '/article/:id',
  method: 'GET',
  action: (request, context) => {
    return 'You called me with: ' + request!.paths!.id
  },
})
