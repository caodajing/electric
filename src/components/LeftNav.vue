<template>
  <div class="leftNav">
    <!-- <ul>
      <li><router-link to="networking">
          <i class=""></i>联网情况
        </router-link></li>
      <li v-for="(item,index) in navData">
          <ol>
            <li v-for="temp in item.list">
              <router-link :to="temp.path">
                <i :class="temp.icon"></i>{{temp.name}}
              </router-link>
            </li>
          </ol>
      </li>
    </ul> -->

    <Menu theme="dark" style="height: 100%" active-name="alarm-center" accordion>
      <div v-for="(item, index) in menuItems" :key="index" >
          <Submenu v-if="item.children && item.children.length> 1" :name="item.name">
              <template slot="title">
                  <i class="iconfont" :class="item.icon"></i>
                  <span>{{item.text}}</span>
              </template>
              <div v-for="(subItem, i) in item.children" :key="index + i">
                  <MenuItem :name="subItem.name" :to="subItem.path">
                      <i class="iconfont" :class="subItem.icon"></i>
                      <span>{{subItem.text}}</span>
                  </MenuItem>
              </div>
          </Submenu>
          <MenuItem v-else :name="getName(item)" :to="item.path">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.text}}</span>
          </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "LeftNav",
    data() {
      return {
        menuItems: [
        {path: '/alarm-center', name: 'alarm-center', icon: 'icon-yibiaopan', text: '报警中心'},
        {path: '/networking', name: 'networking', icon: 'icon-zhinengjiankong', text: '联网情况'},
        { path: '/baiduMap', name: 'baiduMap', icon: 'icon-shipin', text: '地图展示'},
        {path: '/', name: '', icon: 'icon-yibiaopan', text: '智能监控',
          children: [
            {path: '/waterGage', name: 'waterGage', text: '水压监控'},
            {path: '/waterLevel', name: 'waterLevel', text: '水位监控'},
            {path: '/electricalFire', name: 'electricalFire', text: '电气火灾'},
            {path: '/alarmHost', name: 'alarmHost', text: '报警主机'},
            // {path: '/videoMonitor', name: 'videoMonitor', icon: 'icon-shipin', text: '视频监控'},
            // {path: '/ecs_monitor', name: 'ecs_monitor', icon: 'icon-dianqi', text:'电气监控'},
            // {path: '/gas_monitor', name: 'gas_monitor', text: '燃气监控', icon: 'icon-keranqiti'},
            // {path: '/lift_monitor', name: 'lift_monitor', text: '电梯监控', icon: 'icon-diantiguanli'},
            // {path: '/duct_monitor', name: 'duct_monitor', text: '风道监控', icon: 'icon-fengdao'}
          ]
        },
        { path: '/electricSafety', name: 'electricSafety', icon: 'icon-dianqi', text: '用电安全'},
      ]
      }
    },
    methods: {
      getName(item) {
            return item.name
        },
    },
  }
</script>

<style scoped>
.leftNav{
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 8vh;
  height: 100vh;
  box-sizing: border-box;
}
</style>
