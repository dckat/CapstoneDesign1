export default [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: {
      customRender: 'id',
    },
    align: 'center',
    ellipsis: true,
    width: 50,
  },
  {
    title: '모델명',
    dataIndex: 'modelName',
    key: 'modelName',
    scopedSlots: {
      customRender: 'modelName',
    },
    align: 'center',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Schedule ID',
    dataIndex: 'scheduleId',
    key: 'scheduleId',
    scopedSlots: {
      customRender: 'scheduleId',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '수평 속도',
    dataIndex: 'horizontalSpeed',
    key: 'horizontalSpeed',
    scopedSlots: {
      customRender: 'horizontalSpeed',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '수직 속도',
    dataIndex: 'verticalSpeed',
    key: 'verticalSpeed',
    scopedSlots: {
      customRender: 'verticalSpeed',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '지면 고도',
    dataIndex: 'aboveGroundLevel',
    key: 'aboveGroundLevel',
    scopedSlots: {
      customRender: 'aboveGroundLevel',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '해발 고도',
    dataIndex: 'aboveSeaLevel',
    key: 'aboveSeaLevel',
    scopedSlots: {
      customRender: 'aboveSeaLevel',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '위도',
    dataIndex: 'latitude',
    key: 'latitude',
    scopedSlots: {
      customRender: 'latitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '경도',
    dataIndex: 'longitude',
    key: 'longitude',
    scopedSlots: {
      customRender: 'longitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
];
