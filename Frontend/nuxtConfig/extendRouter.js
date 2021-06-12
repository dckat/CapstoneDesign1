export default function extendRoutes(routes, resolve) {
  routes.push({
    name: '404Page',
    path: '*',
    redirect: '/auth/404',
    component: resolve(__dirname, '../src/pages/auth/404.vue'),
  });
}
