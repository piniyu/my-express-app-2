import registerMiddleware from '~/src/middleware/auth/register'
import loginMiddleware from '~/src/middleware/auth/login'
import { Route } from '~/src/routes/type'

export const ROUTES = {
  ROOT: '/',
  REGISTER: '/register',
  LOGIN: '/login'
}

export const routes: Route[] = [
  {
    url: ROUTES.ROOT,
    method: 'get',
    middleware: [
      (req, res) => {
        res.status(200)
        res.send('Express')
      }
    ]
  },
  {
    url: ROUTES.REGISTER,
    method: 'post',
    middleware: registerMiddleware
  },
  {
    url: ROUTES.LOGIN,
    method: 'post',
    middleware: loginMiddleware
  }
]
