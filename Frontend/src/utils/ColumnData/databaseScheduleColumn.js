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
    width: 200,
  },
  {
    title: '시작 날짜 / 시간',
    dataIndex: 'startTime',
    key: 'startTime',
    scopedSlots: {
      customRender: 'startTime',
    },
    align: 'center',
    ellipsis: true,
    width: 120,
  },
  {
    title: '시작 위도',
    dataIndex: 'startLatitude',
    key: 'startLatitude',
    scopedSlots: {
      customRender: 'startLatitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '시작 경도',
    dataIndex: 'startLongitude',
    key: 'startLongitude',
    scopedSlots: {
      customRender: 'startLongitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '종료 날짜 / 시간',
    dataIndex: 'terminateTime',
    key: 'terminateTime',
    scopedSlots: {
      customRender: 'terminateTime',
    },
    align: 'center',
    ellipsis: true,
    width: 120,
  },
  {
    title: '종료 위도',
    dataIndex: 'terminateLatitude',
    key: 'terminateLatitude',
    scopedSlots: {
      customRender: 'terminateLatitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '종료 경도',
    dataIndex: 'terminateLongitude',
    key: 'terminateLongitude',
    scopedSlots: {
      customRender: 'terminateLongitude',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
];
