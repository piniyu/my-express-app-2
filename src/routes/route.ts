import registerMiddleware from '~/src/middleware/auth/register'
import loginMiddleware from '~/src/middleware/auth/login'
import createMiddleware from '~/src/middleware/create'
import readMiddleware from '~/src/middleware/read'
import updateMiddleware from '~/src/middleware/update'
import deleteMiddleware from '~/src/middleware/delete'
import { Route } from '~/src/routes/type'

export const ROUTES = {
  ROOT: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  CREATE: '/create',
  READ: '/read',
  UPDATE: '/update',
  DELETE: '/delete'
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
  },
  {
    url: ROUTES.CREATE,
    method: 'post',
    middleware: createMiddleware
  },
  { url: ROUTES.READ, method: 'get', middleware: readMiddleware },
  { url: ROUTES.UPDATE, method: 'put', middleware: updateMiddleware },
  { url: ROUTES.DELETE, method: 'delete', middleware: deleteMiddleware }
]
