import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CrearProductoView from '../views/CrearProductoView.vue';
import CrearOrdenView from '../views/CrearOrdenView.vue';
import EditarProductoView from '../views/EditarProductoView.vue';
import EditarOrdenView from '../views/EditarOrdenView.vue';
import MostrarProductoView from '../views/MostrarProductoView.vue';
import MostrarOrdenView from '../views/MostrarOrdenView.vue';
import ReporteView from '../views/ReporteView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mostrar-producto',
    name: 'mostrar-producto',
    component: MostrarProductoView
  },
  {
    path: '/mostrar-ordenes',
    name: 'mostrar-ordenes',
    component: MostrarOrdenView
  },
  {
    path: '/crear-producto',
    name: 'crear-producto',
    component: CrearProductoView
  },
  {
    path: '/crear-ordenes',
    name: 'crear-ordenes',
    component: CrearOrdenView
  },
  {
    path: '/editar-producto/:id',
    name: 'editar-producto',
    component: EditarProductoView
  },
  {
    path: '/editar-ordenes/:id',
    name: 'editar-ordenes',
    component: EditarOrdenView
  },
  {
    path: '/reporte',
    name: 'reporte',
    component: ReporteView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
