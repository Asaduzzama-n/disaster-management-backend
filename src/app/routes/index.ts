import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { UserRoutes } from '../modules/user/user.routes'
import { CrisisRoutes } from '../modules/crisis/crisis.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/crisis',
    route: CrisisRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
