import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CrearProductoView from '../views/CrearProductoView.vue';
import CrearOrdenView from '../views/CrearOrdenView.vue';
import EditarProductoView from '../views/EditarProductoView.vue';
import EditarOrdenView from '../views/EditarOrdenView.vue';
import MostrarProductoView from '../views/MostrarProductoView.vue';
import MostrarOrdenView from '../views/MostrarOrdenView.vue';


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
    path: '/mostrar-orden',
    name: 'mostrar-orden',
    component: MostrarOrdenView
  },
  {
    path: '/crear-producto',
    name: 'crear-producto',
    component: CrearProductoView
  },
  {
    path: '/crear-orden',
    name: 'crear-orden',
    component: CrearOrdenView
  },
  {
    path: '/editar-producto/:id',
    name: 'editar-producto',
    component: EditarProductoView
  },
  {
    path: '/editar-orden/:id',
    name: 'editar-orden',
    component: EditarOrdenView
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
