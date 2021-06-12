function toRad(deg) {
  return deg * (Math.PI / 180);
}
// use Haversine Formula
export default function calcDistanceFromCoord(oldVal, newVal) {
  if ((oldVal == null || oldVal.latitude == null) || (newVal == null || newVal.latitude == null)) return undefined;

  const R = 6371000;

  const φ1 = toRad(oldVal.latitude);
  const φ2 = toRad(newVal.latitude);
  const Δφ = toRad(Number(newVal.latitude) - Number(oldVal.latitude));
  const Δλ = toRad(Number(newVal.longitude) - Number(oldVal.longitude));

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
    + Math.cos(φ1) * Math.cos(φ2)
    * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const result = R * c;

  return Number(result.toFixed(1)); // Distance in meter
}
