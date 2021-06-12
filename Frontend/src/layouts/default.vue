<template>
  <a-config-provider>
    <a-layout :style="{height: '100%'}">
      <a-layout-header class="header-style">
        <div class="r-flex gap-2 space-between">
          <div class="r-flex start">
            <div style="margin-right: 20px">
              <a-icon class="logo-title" type="compass" />
              <span class="logo-title">Drone Web</span>
            </div>
            <a-menu
              theme="dark"
              mode="horizontal"
              v-model="tabKey"
              :style="{lineHeight: '40px'}"
            >
              <a-menu-item :key="1" class="router-menu-item">
                <nuxt-link to="/">
                  <a-icon type="environment" />
                  RT-Map
                </nuxt-link>
              </a-menu-item>
              <a-menu-item :key="2" class="router-menu-item router-menu-margin">
                <a-dropdown>
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                  >
                    <a-icon type="database" />
                    DataBase
                  </a>
                  <a-menu
                    v-model="dbMenu"
                    slot="overlay"
                    @click="hoverClick"
                    :style="{textAlign: 'center'}"
                    class="router-database"
                  >
                    <a-menu-item :key="1">
                      Drone
                    </a-menu-item>
                    <a-menu-item :key="2">
                      Schedule
                    </a-menu-item>
                    <a-menu-item :key="3">
                      Log
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-menu-item>
              <a-menu-item :key="3" class="router-menu-item" disabled>
                <!-- <nuxt-link to="/analytics">
                  <a-icon type="dashboard" />
                  Analytics
                </nuxt-link> -->
                <div @click="info()">
                  <a-icon type="dashboard" />
                  Analytics
                </div>
              </a-menu-item>
              <!-- <a-menu-item :key="4" class="router-menu-item">
                <nuxt-link to="/websocket">
                  websocket
                </nuxt-link>
              </a-menu-item> -->
            </a-menu>
          </div>
          <div class="nav-etc">
            <a-dropdown>
              <a-button
                type="dash"
                icon="setting"
                style="background-color: rgba(245, 245, 245, 0.9); border: 2px solid #e4e9f0; color: #001529"
              />
              <a-menu
                slot="overlay"
                @click="clickEtc"
                class="router-database"
              >
                <a-menu-item-group style="text-align: center">
                  WebSocket
                </a-menu-item-group>
                <a-menu-divider style="margin-top: 8px" />
                <a-menu-item key="connect">
                  <a-icon type="link"/>Connect
                </a-menu-item>
                <a-menu-item key="disconnect">
                  <a-icon type="disconnect"/>Disconnect
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{padding: '0 20px', marginTop: '84px'}">
        <div :style="{minHeight: 'calc(100vh - 84px - 89px)', height: '100%'}">
          <nuxt keep-alive />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer-style">
        <layout-footer />
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script>
import LayoutFooter from '@/components/Layout/footer';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { LayoutFooter },
  /* vue-meta -> 각 페이지의 meta */
  head() {
    return {
      titleTemplate: 'Drone Web - %s',
      meta: [
        {
          hid: 'defaultLayout',
          name: 'Descriptions',
          content: 'Content',
        },
      ],
    };
  },
  data() {
    return {
      tabKey: [1],
      dbMenu: [0],
      etcAction: 'connect',
    };
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.changeMenuRoute();
      },
    },
  },
  created() {
    this.changeMenuRoute();
    this.$store.dispatch('Drone/list/fetchListContents').then((r) => {
      const makerList = {};
      const { drones } = r;
      for (let i = 0; i < drones.length; i += 1) {
        if (makerList[drones[i].maker]) makerList[drones[i].maker].push(drones[i]);
        else makerList[drones[i].maker] = [drones[i]];
      }
      this.$store.dispatch('Drone/list/setFixedDroneList', drones);
      this.$store.dispatch('Etc/setMakers', makerList);
    });
  },
  computed: {
    ...mapGetters('Schedule/page', {
      getSchdulePageParams: 'getPageParams',
    }),
    ...mapGetters('Log/page', {
      getLogPageParams: 'getPageParams',
    }),
  },
  methods: {
    changeMenuRoute() {
      const pageRoute = this.$route.fullPath.split('/')[1];
      switch (pageRoute) {
      case '':
        this.tabKey = [1];
        this.dbMenu = [0];
        break;
      case 'database':
        this.tabKey = [2];
        break;
      case 'analytics':
        this.tabKey = [3];
        this.dbMenu = [0];
        break;
      default:
        this.tabKey = [999];
        this.dbMenu = [0];
        break;
      }
    },
    hoverClick(data) {
      const { key } = data;
      this.tabKey = [2];

      switch (key) {
      case 1:
        this.dbMenu = [1];
        this.$router.push('/database/drone');
        break;
      case 2:
        this.clearSchedulePageParams();
        this.fetchSchedulePageData(this.getSchdulePageParams);
        this.dbMenu = [2];
        this.$router.push('/database/schedule');
        break;
      case 3:
        this.clearLogPageParams();
        this.fetchLogPageData(this.getLogPageParams);
        this.dbMenu = [3];
        this.$router.push('/database/log');
        break;
      default:
        break;
      }
    },
    ...mapActions('Schedule/page', {
      fetchSchedulePageData: 'fetchPageData',
      clearSchedulePageParams: 'clearPageParams',
    }),
    ...mapActions('Log/page', {
      fetchLogPageData: 'fetchPageData',
      clearLogPageParams: 'clearPageParams',
    }),
    info() {
      const h = this.$createElement;
      this.$info({
        title: 'Notification',
        content: h('div', {}, [h('p', '개발 예정인 기능입니다.')]),
        onOk() {},
      });
    },
    clickEtc(e) {
      if (e === 'connect') this.connect();
      else this.disconnect();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.logo-title {
  color: white;
  font-size: 20px;
  margin-left: 20px;
}
.router-menu-item {
  border-radius: 8px;
}
.router-menu-margin {
  margin: 0 10px;
}
.header-style {
  position: fixed;
  z-index: 100;
  width: 100%;
  padding: 0px;
}
.nav-etc {
  margin-right: 20px;
  line-height: 30px;
}
.footer-style {
  background-color: #001529;
  text-align: center;
  margin: 20px 15px 0px 15px;
  border-radius: 6px 6px 0px 0px;
  padding: 12px 0px 6px 0px;
}

.ant-dropdown-menu-item-selected,
.ant-dropdown-menu-submenu-title-selected,
.ant-dropdown-menu-item-selected > a,
.ant-dropdown-menu-submenu-title-selected > a {
  background: none;
}
</style>
