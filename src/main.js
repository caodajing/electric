// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import  './assets/iconfont/iconfont.css'
import  './assets/iconfont1/iconfont.css'
import './assets/js/jquery-1.4.4.min.js'
import './assets/js/jquery.ztree.core.min.js'
import './assets/js/jquery.ztree.excheck.min.js'
import './assets/css/zTreeStyle/zTreeStyle.css'
import dayjs from 'dayjs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(VueSweetalert2);
Vue.use(iView)
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    data(){
        return{
            $userData:'',
            SHORTCUTNAV:[],//快捷导航列表
        }
    },
    components: { App },
    template: '<App/>'
})
