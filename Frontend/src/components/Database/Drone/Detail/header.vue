<template>
  <a-page-header
    class="page-header"
    title="드론 정보"
    sub-title="Drone-Schedule"
    @back="$router.go(-1)"
  >
    <div :style="{display: 'flex'}">
      <div :style="{width: '30%'}">
        <img :src="droneInfo.picture" :style="{width: '90%'}" />
      </div>

      <div :style="{width: '70%', marginLeft: '20px'}">
        <div class="label-modelName">{{ droneInfo.modelName }}</div>
        <div :style="{display: 'flex', marginBottom: '15px'}">
          <div class="label-info">info</div>

          <a-descriptions
            :column="{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}"
            class="description-box"
          >
            <a-descriptions-item label="모델명">
              {{ droneInfo.modelName }}
            </a-descriptions-item>
            <a-descriptions-item label="제조사">
              {{ droneInfo.maker == null ? 'None' : droneInfo.maker }}
            </a-descriptions-item>
            <a-descriptions-item label="종류">
              {{ droneInfo.usage == null ? 'None' : droneInfo.usage }}
            </a-descriptions-item>
            <a-descriptions-item label="제원">
              {{
                droneInfo.specification == null
                  ? 'None'
                  : droneInfo.specification
              }}
            </a-descriptions-item>
            <a-descriptions-item label="무게">
              {{ droneInfo.weight == null ? '?' : droneInfo.weight }} kg
            </a-descriptions-item>
            <a-descriptions-item label="No">
              {{ droneInfo.id }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <a-divider />
  </a-page-header>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'DatabaseDetailHeader',
  components: {},
  data() {
    return {
      droneInfo: {},
    };
  },
  computed: {
    ...mapGetters('Drone/detail', {
      getDetailData: 'getDetailData',
    }),
    ...mapGetters('Code', {
      getCodes: 'getCodes',
    }),
    droneCategory() {
      return (data) => {
        switch (parseInt(data, 10)) {
          case 1:
            return '촬영용';
          case 2:
            return '레이싱용';
          case 3:
            return '완구용';
          default:
            return null;
        }
      };
    },
  },
  created() {
    console.log(this.getDetailData);
    this.droneInfo = this.getDetailData;
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.label-modelName {
  font-size: 30px;
  color: $antblue;
}
.label-info {
  padding: 0 10px;
  border-right: 1px solid #777777;
  min-width: 20%;
}
.description-box {
  padding-left: 10px;
}
</style>
