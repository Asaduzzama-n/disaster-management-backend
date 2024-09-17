import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { UserRoutes } from '../modules/user/user.routes'
import { CrisisRoutes } from '../modules/crisis/crisis.routes'
import { TaskRoutes } from '../modules/task/task.routes'
import { DonationRoutes } from '../modules/donation/donation.routes'
import { InventoryRoutes } from '../modules/inventory/inventory.routes'

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
  {
    path: '/task',
    route: TaskRoutes,
  },
  {
    path: '/donation',
    route: DonationRoutes,
  },
  {
    path: '/inventory',
    route: InventoryRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
