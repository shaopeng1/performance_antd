import React, { PureComponent, Fragment } from 'react';
import { Drawer, List, Avatar, Divider, Col, Row, Button, BackTop } from 'antd';
import styles from './TableList.less';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => {
  return (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
};
// const { status } = this.props;

export default class Drawerjs extends PureComponent {
  state = { visible: false };

  constructor(props) {
    super(props);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log('sssssssssssssssssss' + JSON.stringify(this.props));
    return (
      <div>
        <div className={styles.tableListOperator}>
          <Button type="primary" onClick={this.showDrawer}>
            查看
          </Button>
          <Button type="primary" onClick={this.showDrawer}>
            修改
          </Button>
        </div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>236交换</p>
          <p style={pStyle}>唯一标识符</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="IP地址" content="10.8.52.236" />{' '}
            </Col>
            <Col span={12}>
              <DescriptionItem title="网元号码" content="236" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="国家码" content="460" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="网络码" content="1010" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="配置参数" content="交换中心信息." />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>集群模式</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="组附着生命周期" content="开关机注册" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="通知注册方式" content="组地址" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="存储转发" content="禁用" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="MSC组播地址" content={<a>237.0.0.1</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="局部并组呼叫范围" content="设置的基站列表." />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>系统参数</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="PDT地市区号" content="328" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="号码" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="故障告警"
                content={<a>网管(1). 交换中心(1).基站(1280/test1280/10.8.56.232)</a>}
              />
            </Col>
          </Row>
        </Drawer>
        <BackTop />
      </div>
    );
  }
}
