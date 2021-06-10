/* eslint-disable no-mixed-operators */
export default function calcAngleFromCoord(oldVal, newVal) {
  if ((oldVal == null || oldVal.latitude == null) || (newVal == null || newVal.latitude == null)) return undefined;

  const x = newVal.latitude - oldVal.latitude;
  const y = newVal.longitude - oldVal.longitude;

  const radian = Math.atan2(y, x);
  return radian * 180 / Math.PI;
}
