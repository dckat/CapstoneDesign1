import calcDistanceFromCoord from '@/utils/CommonFunction/calcDistanceFromCoord';
import calcAngleFromCoord from '@/utils/CommonFunction/calcAngleFromCoord';

export default {
  data() {
    return {
    };
  },
  computed: {
    calcAngle() {
      return (oldVal, newVal) => calcAngleFromCoord(oldVal, newVal);
    },
    calcVelocity() {
      return (oldVal, newVal) => `${calcDistanceFromCoord(oldVal, newVal)}m/s`;
    },
    calcDistance() {
      return (logs) => {
        let sum = 0;
        for (let i = 1; i < logs.length; i += 1) {
          const oldVal = logs[i - 1];
          const newVal = logs[i];
          sum += calcDistanceFromCoord(oldVal, newVal);
        }
        return sum;
      };
    },
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
  },
};
