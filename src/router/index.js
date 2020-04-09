import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Networking from '@/page/Networking'
import duct_monitor from '@/page/Duct-Monitor'
import ecs_monitor from '@/page/ECS-Monitor'
import gas_monitor from '@/page/Gas-Monitor'
import lift_monitor from '@/page/Lift-Monitor'
import videoMonitor from '@/page/VideoMonitor'
import waterGage from '@/page/WaterGage'
import waterLevel from '@/page/waterLevel'
import alarmcenter from '@/page/alarm-center'
import alarmHost from '@/page/alarmHost'
import electricalFire from '@/page/electricalFire'

//用电安全模块路由 start
import electricSafety from '@/page/electricSafety/formwork1/electricSafety'
import keyMonitoring from '@/page/electricSafety/formwork1/keyMonitoring'

import consumeEnergy from '@/page/electricSafety/formwork2/consumeEnergy'

import loopMonitoring from '@/page/electricSafety/formwork3/loopMonitoring'
import loopControl from '@/page/electricSafety/formwork3/loopControl'

import energyQuery from '@/page/electricSafety/formwork4/energyQuery'
import energyDetailed from '@/page/electricSafety/formwork4/energyDetailed'
import voltageCurrent from '@/page/electricSafety/formwork4/voltageCurrent'
import electricityDetailed from '@/page/electricSafety/formwork4/electricityDetailed'
import smokeAlarmDetails from '@/page/electricSafety/formwork4/smokeAlarmDetails'
import doorContactState from '@/page/electricSafety/formwork4/doorContactState'
import humitureAlarm from '@/page/electricSafety/formwork4/humitureAlarm'

import eventNotification from '@/page/electricSafety/formwork5/eventNotification'

import energyProfile from '@/page/electricSafety/formwork6/energyProfile'
import safetyReports from '@/page/electricSafety/formwork6/safetyReports'

import organizeManage from '@/page/electricSafety/formwork7/organizeManage'
import roleManager from '@/page/electricSafety/formwork7/roleManager'
import userManager from '@/page/electricSafety/formwork7/userManager'
import buildingUnit from '@/page/electricSafety/formwork7/buildingUnit'
import circuitManager from '@/page/electricSafety/formwork7/circuitManager'
import monitoringLoopManager from '@/page/electricSafety/formwork7/monitoringLoopManager'
import deviceManager from '@/page/electricSafety/formwork7/deviceManager'
import hostManager from '@/page/electricSafety/formwork7/hostManager'
import deviceStatus from '@/page/electricSafety/formwork7/deviceStatus'

import largeScreen from '@/page/electricSafety/formwork8/largeScreen'
//用电安全模块路由 end

// 测试页面
import testMap from '@/page/testMap'
import baiduMap from '@/page/baiduMap'

import {getCookie} from '../assets/js/cookie.js'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/zigbeeweb/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {
          path: '/networking',
          name: 'networking',
          meta: {
            requireAuth: true,
          },
          component: Networking,
        },
        {
          path: '/duct_monitor',
          name: 'duct_monitor',
          meta: {
            requireAuth: true,
          },
          component: duct_monitor,
        },
        {
          path: '/ecs_monitor',
          name: 'ecs_monitor',
          meta: {
            requireAuth: true,
          },
          component: ecs_monitor,
        },
        {
          path: '/gas_monitor',
          name: 'gas_monitor',
          meta: {
            requireAuth: true,
          },
          component: gas_monitor,
        },
        {
          path: '/lift_monitor',
          name: 'lift_monitor',
          meta: {
            requireAuth: true,
          },
          component: lift_monitor,
        },
        {
          path: '/videoMonitor',
          name: 'videoMonitor',
          meta: {
            requireAuth: true,
          },
          component: videoMonitor,
        },
        {
          path: '/waterGage',
          name: 'waterGage',
          meta: {
            requireAuth: true,
          },
          component: waterGage,
        },
        {
          path: '/waterLevel',
          name: 'waterLevel',
          meta: {
            requireAuth: true,
          },
          component: waterLevel,
        },
        {
          path: '/baiduMap',
          name: 'baiduMap',
          component: baiduMap
        },
        {
          path: '/alarm-center',
          name: 'alarm-center',
          meta: {
            requireAuth: true,
          },
          component: alarmcenter,
        },
        {
          path: '/alarmHost',
          name: 'alarmHost',
          meta: {
            requireAuth: true,
          },
          component: alarmHost,
        },
        {
          path: '/electricalFire',
          name: 'electricalFire',
          meta: {
            requireAuth: true,
          },
          component: electricalFire,
        },
        //用电路由模块 start
        {
          path: '/electricSafety',
          name: 'electricSafety',
          meta: {
            requireAuth: true,
          },
          component: electricSafety,
        },
        {
          path: '/keyMonitoring',
          name: 'keyMonitoring',
          meta: {
            requireAuth: true,
          },
          component: keyMonitoring,
        },
        {
          path: '/consumeEnergy',
          name: 'consumeEnergy',
          meta: {
            requireAuth: true,
          },
          component: consumeEnergy,
        },
        {
          path: '/loopMonitoring',
          name: 'loopMonitoring',
          meta: {
            requireAuth: true,
          },
          component: loopMonitoring,
        },
        {
          path: '/loopControl',
          name: 'loopControl',
          meta: {
            requireAuth: true,
          },
          component: loopControl,
        },
        {
          path: '/energyQuery',
          name: 'energyQuery',
          meta: {
            requireAuth: true,
          },
          component: energyQuery,
        },
        {
          path: '/energyDetailed',
          name: 'energyDetailed',
          meta: {
            requireAuth: true,
          },
          component: energyDetailed,
        },
        {
          path: '/voltageCurrent',
          name: 'voltageCurrent',
          meta: {
            requireAuth: true,
          },
          component: voltageCurrent,
        },
        {
          path: '/electricityDetailed',
          name: 'electricityDetailed',
          meta: {
            requireAuth: true,
          },
          component: electricityDetailed,
        },
        {
          path: '/smokeAlarmDetails',
          name: 'smokeAlarmDetails',
          meta: {
            requireAuth: true,
          },
          component: smokeAlarmDetails,
        },
        {
          path: '/doorContactState',
          name: 'doorContactState',
          meta: {
            requireAuth: true,
          },
          component: doorContactState,
        },
        {
          path: '/humitureAlarm',
          name: 'humitureAlarm',
          meta: {
            requireAuth: true,
          },
          component: humitureAlarm,
        },
        {
          path: '/eventNotification',
          name: 'eventNotification',
          meta: {
            requireAuth: true,
          },
          component: eventNotification,
        },
        {
          path: '/energyProfile',
          name: 'energyProfile',
          meta: {
            requireAuth: true,
          },
          component: energyProfile,
        },
        {
          path: '/safetyReports',
          name: 'safetyReports',
          meta: {
            requireAuth: true,
          },
          component: safetyReports,
        },
        {
          path: '/organizeManage',
          name: 'organizeManage',
          meta: {
            requireAuth: true,
          },
          component: organizeManage,
        },
        {
          path: '/roleManager',
          name: 'roleManager',
          meta: {
            requireAuth: true,
          },
          component: roleManager,
        },
        {
          path: '/userManager',
          name: 'userManager',
          meta: {
            requireAuth: true,
          },
          component: userManager,
        },
        {
          path: '/buildingUnit',
          name: 'buildingUnit',
          meta: {
            requireAuth: true,
          },
          component: buildingUnit,
        },
        {
          path: '/systemReport',
          name: 'systemReport',
          meta: {
            requireAuth: true,
          },
          component: energyProfile,
        },
        {
          path: '/circuitManager',
          name: 'circuitManager',
          meta: {
            requireAuth: true,
          },
          component: circuitManager,
        },
        {
          path: '/monitoringLoopManager',
          name: 'monitoringLoopManager',
          meta: {
            requireAuth: true,
          },
          component: monitoringLoopManager,
        },
        {
          path: '/deviceManager',
          name: 'deviceManager',
          meta: {
            requireAuth: true,
          },
          component: deviceManager,
        },
        {
          path: '/hostManager',
          name: 'hostManager',
          meta: {
            requireAuth: true,
          },
          component: hostManager,
        },
        {
          path: '/deviceStatus',
          name: 'deviceStatus',
          meta: {
            requireAuth: true,
          },
          component: deviceStatus,
        },
        {
          path: '/largeScreen',
          name: 'largeScreen',
          meta: {
            requireAuth: true,
          },
          component: largeScreen,
        },
        //用电路由模块 end
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: "*",
      redirect: "/networking"
    },
    // 测试页面
    {
      path: '/testMap',
      name: 'testMap',
      component: testMap
    }
  ],

});
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (getCookie('token') && (getCookie('token') != 'undefined')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});
export default router
