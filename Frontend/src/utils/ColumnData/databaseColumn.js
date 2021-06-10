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
    title: '제조사',
    dataIndex: 'maker',
    key: 'maker',
    scopedSlots: {
      customRender: 'maker',
    },
    align: 'center',
    ellipsis: true,
    width: 120,
  },
  {
    title: '종류',
    dataIndex: 'usageName',
    key: 'usageName',
    scopedSlots: {
      customRender: 'usageName',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '무게',
    dataIndex: 'weight',
    key: 'weight',
    scopedSlots: {
      customRender: 'weight',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
  {
    title: '제원',
    dataIndex: 'specification',
    key: 'specification',
    scopedSlots: {
      customRender: 'specification',
    },
    align: 'center',
    ellipsis: true,
    width: 60,
  },
];
