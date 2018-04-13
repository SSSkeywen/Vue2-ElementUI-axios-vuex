import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import changePassword from '@/page/changePassword'
import offspringConfiguration from '@/page/offspringConfiguration'
import businessConfiguration from '@/page/businessConfiguration'
import modulesConfiguration from '@/page/modulesConfiguration'
import reportFormStatistics from '@/page/reportFormStatistics'
import download from '@/page/download'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },{
      path: '/offspringConfiguration',
      name: 'offspringConfiguration',
      component: offspringConfiguration
    },{
      path: '/businessConfiguration',
      name: 'businessConfiguration',
      component: businessConfiguration
    },{
      path: '/modulesConfiguration',
      name: 'modulesConfiguration',
      component: modulesConfiguration
    },{
      path: '/reportFormStatistics',
      name: 'reportFormStatistics',
      component: reportFormStatistics
    }, {
      path: '/download',
      name: 'download',
      component: download
    }
  ]
})
