export class DroneLogDto {
  constructor(props) {
    // props.id = props.id ? parseInt(props.id) : props.id;
    props.droneId = props.droneId ? parseInt(props.droneId) : props.droneId;
    props.scheduleId = props.scheduleId
      ? parseInt(props.scheduleId)
      : props.scheduleId;
    Object.assign(this, props);
  }
  id: number;
  droneId: number;
  scheduleId: number;
  latitude: number;
  longitude: number;
  verticalSpeed: number;
  horizontalSpeed: number;
  aboveSeaLevel: number;
  aboveGroundLevel: number;
}
