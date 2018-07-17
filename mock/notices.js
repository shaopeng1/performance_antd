export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '到设备的链路中断',
      datetime: '2017-08-09',
      type: '紧急告警',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '与基站通信中断',
      datetime: '2017-08-08',
      type: '紧急告警',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '与基站通信中断',
      datetime: '2017-08-07',
      read: true,
      type: '紧急告警',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '与基站通信中断',
      datetime: '2017-08-07',
      type: '紧急告警',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '与短信业务网关通信中断',
      datetime: '2017-08-07',
      type: '紧急告警',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '主要告警',
      description: '网管(1). 交换中心(1).基站(899/aaa899/5.6.6.17)',
      datetime: '2017-08-07',
      type: '一般告警',
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '主要告警',
      description: '网管(1). 交换中心(1).基站(899/aaa899/5.6.6.17)',
      datetime: '2017-08-07',
      type: '一般告警',
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '主要告警',
      description: '网管(1). 交换中心(1).基站(899/aaa899/5.6.6.17)',
      datetime: '2017-08-07',
      type: '一般告警',
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '次要告警',
      description: '与短信业务网关通信中断 ',
      extra: '马上到期',
      status: 'urgent',
      type: '次要告警',
    },
  ]);
};
export default {
  getNotices,
};
