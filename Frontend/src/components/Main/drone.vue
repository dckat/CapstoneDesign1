<template>
  <div>
    <l-marker
      ref="markersRef"
      :lat-lng="[latitude, longitude]"
      @click="clickDrone"
    >
      <l-icon
        :icon-size="iconSize"
        :icon-anchor="[20, 20]"
        :icon-url="icon"
      ></l-icon>
    </l-marker>
    <l-polyline :lat-lngs="drone.polyline.latlngs" :color="drone.polyline.color"></l-polyline>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  head() {
    return {
      title: 'Drone',
      meta: [
        {
          hid: 'database',
          name: 'Descriptions',
          content: 'DroneWeb-Content',
        },
      ],
    };
  },
  props: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    icon: {
      default: null,
    },
  },
  data() {
    return {
      drone: {
        latitude: 37.2430125,
        longitude: 127.0811054,
        polyline: {
          latlngs: [],
          color: 'red',
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      // console.log('hi', this.$refs.markersRef)
      // this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject);
      // console.log(this.markerObjects)
    });
  },
  computed: {
    ...mapGetters('Drone/Map', {
      getZoomLevel: 'getZoomLevel',
    }),
    iconSize() {
      if (this.getZoomLevel == null) return [40, 40];
      return [this.getZoomLevel * 2.2, this.getZoomLevel * 2.2];
    },
  },
  created() {
    // this.makeDronePath();
  },
  methods: {
    clickDrone() {
      this.$emit('clickDrone');
    },
    makeDronePath() {
      // setTimeout(() => {
      //   this.drone.latitude += 0.00005;
      //   // this.drone.longitude += 0.00005;
      //   this.drone.polyline.latlngs.push([this.drone.latitude, this.drone.longitude]);
      //   this.makeDronePath();
      // }, 500);
    },
  },
};
</script>
