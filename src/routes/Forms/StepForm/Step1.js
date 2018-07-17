import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Slider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import TweenOne from 'rc-tween-one';

const { Option } = Select;
const TweenOneGroup = TweenOne.TweenOneGroup;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        // console.log(JSON.stringify(values));
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(
            routerRedux.push({
              pathname: '/form/step-form/confirm',
              query: values,
            })
          );
        }
      });
    };
    return (
      <Fragment>
        <TweenOneGroup>
          <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
            <Form.Item {...formItemLayout} label="用户名">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请填写用户名' }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('passWord', {
                rules: [{ required: true, message: '请填写密码' }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: {
                  span: formItemLayout.wrapperCol.span,
                  offset: formItemLayout.labelCol.span,
                },
              }}
              label=""
            >
              <Button type="primary" onClick={onValidateForm}>
                下一步
              </Button>
            </Form.Item>
          </Form>
        </TweenOneGroup>
        <Divider style={{ margin: '40px 0 24px' }} />

        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step1);
