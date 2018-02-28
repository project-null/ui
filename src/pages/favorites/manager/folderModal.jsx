import React, {PropTypes} from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, visible, onOk, onCancel} = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
     labelCol: {
       xs: { span: 24 },
       sm: { span: 5 },
     },
     wrapperCol: {
       xs: { span: 24 },
       sm: { span: 19 },
     },
    };

    return (
      <Modal title={title}
        maskClosable={false}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="上级目录"
          >
            {getFieldDecorator('parentID', {
              initialValue: 'root',
              rules: [{
                required: true, message: '请输入上级目录!'
              }],
            })(
              <Input placeholder="请输入上级目录!"  />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="文件夹名称"
          >
            {getFieldDecorator('name', {
              initialValue:'default',
              rules: [{
                required: true, message: '请输入文件夹名称!'
              }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('desc', {
              initialValue:'无',
              rules: [{
                required: true, message: '请输入描述!'
              }],
            })(
              <TextArea placeholder="请输入描述!"
                autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const ModalForm = Form.create()(Index);

Index.propTypes = {
};

export default ModalForm;
