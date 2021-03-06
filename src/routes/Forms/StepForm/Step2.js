import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;

    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/form/step-form'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch(routerRedux.push('/form/step-form/confirm4'));
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="地址">
          {getFieldDecorator('no1', {
            rules: [{ required: true, message: '请填写地址' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系电话">
          {getFieldDecorator('no2', {
            rules: [{ message: '请填写联系电话' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="真实姓名">
          {getFieldDecorator('no3', {
            rules: [{ message: '真实姓名' }],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button onClick={onValidateForm} style={{ marginLeft: 8 }}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step2);
