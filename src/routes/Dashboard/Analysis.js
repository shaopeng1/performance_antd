import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Row,Col,Icon,Card,Tabs,Table,Radio,Select,DatePicker,Tooltip,Menu,Dropdown,} from 'antd';
import numeral from 'numeral';
import {ChartCard,yuan,WaterWave,MiniArea,MiniBar,MiniProgress,Field,Gauge,Bar,Pie,TimelineChart,} from 'components/Charts';
import Trend from 'components/Trend';
import { probSource, tubiao,changeNeTypeNew } from '../../services/api';
import NumberInfo from 'components/NumberInfo';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const rankingListData = [];
const ceshiData = [];
const salesExtra = [];
const salesExtraOption = [];//指标集
const salesBS = [];//基站
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `交换中心 ${i}`,
    total: 323234,
  });
}
//
const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }}
  /> /* eslint-disable-line react/no-danger */
);

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    maxGroupData :'',//最大组注册数
    currentTabKey: '',
    selectDate :'',
    rangePickerValue: getTimeDistance('year'),
  };

  loop =(data)=>{
      salesExtraOption.splice(0,salesExtraOption.length);
    for(let i = 0; i<data.length; i++){
      salesExtraOption.push(
        <Option value = {data[i].indexSetId}> {data[i].indexSetName} </Option>
      )
    }
    return salesExtraOption;
  }

  loopBS =(data)=>{
      salesBS.splice(0,salesBS.length);
    for(let i = 0; i<data.length; i++){
      salesBS.push(
        <Option value = {data[i].id}> {data[i].name} </Option>
      )
    }
    return salesBS;
  }

  componentDidMount() {
    this.netype("1")
  } 

//选择对象类型时调用
  netype = e =>{
    this.promise = changeNeTypeNew({'neType' : e}).then(result => {
      let res = JSON.parse(result);
      let idName = res.idName;
      let indexSet = res.indexSet;

     ceshiData.splice(0,ceshiData.length);
      for (let i = 0; i < res.x.length; i++) {
        ceshiData.push({
          x: res.x[i],
          y: res.y[i],
        });
      }

      if (idName.length > 0) {
        this.loop(indexSet)//<OPTIOn>列表
        this.loopBS(idName)//<OPTIOn>列表
        salesExtra.splice(0,salesExtra.length);
        salesExtra.push(
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <Select defaultValue="1" style={{ width: 120 }} onChange = {this.netype}>
                <Option value="1">交换中心</Option>
                <Option value="2">基站</Option>
                <Option value="3">调度</Option>
                <Option value="5">通话组</Option>
                <Option value="6">用户</Option>
                <Option value="7">虚拟专网</Option>
              </Select> 
            </div>
            
          <div className={styles.salesExtra}>
            <Select defaultValue="0" style={{ width: 120 }}>
              <Option value="0">5分钟</Option>
              <Option value="1">60分钟</Option>
              <Option value="2">每天</Option>
              <Option value="3">周</Option>
              <Option value="4">月</Option>
            </Select>
          </div>
         
          <div className={styles.salesExtra}>
            <Select defaultValue= {indexSet[0].indexSetId} style={{ width: 180 }}>
            {
              salesExtraOption
            }
            </Select>
          </div>

          <div className={styles.salesExtra}>
            <Select defaultValue= {idName[0].id} style={{ width: 120 }}>
            {
              salesBS
            }
            </Select>
          </div>
        </div>
        )
        this.setState({
          selectDate:salesExtra,
          maxGroupData:ceshiData,
        })
      }
    });
  }

  callback = key => {
    switch (key) {
      case '1':
        this.echarts1();
        break;
      case '2':
        this.echarts2();
        break;
      case '3':
        this.echarts3();
        break;
      default:
        this.echarts1();
        break;
    }
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  /*selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };*/

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {

    console.log("sssssssssssssssssssss"+JSON.stringify(this.state.maxGroupData))

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }

    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,

      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );
    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );


    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              style={{ height: 282 }}
              bordered={false}
              title="交换总呼损率"
              action={
                <Tooltip title="可添加任意注释">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <Yuan>126560</Yuan>}
              footer={<Field label="每时呼损率" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={55}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="交换总呼损率" bodyStyle={{ textAlign: 'center' }} bordered={false}>
              <Gauge title="呼损率" height={180} percent={60} />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={180} title="内存使用剩余" percent={34} />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              style={{ height: 282 }}
              bordered={false}
              title="运营活动效果"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={this.state.selectDate} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="最大组注册数" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="最大组注册数统计" data={this.state.maxGroupData} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>交换注册数排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="告警" key="views">
                <Row style={{ padding: '16px 0' }}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="告警趋势" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            <Card
              title="统计"
              style={{ marginTop: 24 }}
              bordered={false}
              className={styles.salesCard1}
            >
              <div id="main2" style={{ width: 1300, height: 400 }} />
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card
              title="告警种类占比"
              style={{ marginTop: 24 }}
              bordered={false}
              className={styles.salesCard1}
            >
              <Row>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="一般"
                    total="28%"
                    height={200}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#ff1818"
                    percent={22}
                    subTitle="紧急"
                    total="22%"
                    height={200}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#f5ef0d"
                    percent={32}
                    subTitle="次要"
                    total="32%"
                    height={200}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                      <TabPane tab="信道排队数量" key="1" />
                      <TabPane tab="最大用户注册数" key="2" />
                      <TabPane tab="有效呼叫总户数" key="3" />
                    </Tabs>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <div id="main" style={{ width: 700, height: 400 }} />
            </Card>
          </Col>
        </Row>
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </Fragment>
    );
  }
}
