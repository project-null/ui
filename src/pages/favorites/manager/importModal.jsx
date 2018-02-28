import React, {PropTypes} from 'react';
import { Modal, Upload, message, Button, Icon} from 'antd';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename:[]
    }
  }


  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log( info.fileList);
    }
    if (info.file.status === 'done') {
        let filename = [];
        info.fileList.map(ele=>{
          filename.push(ele.response.filename)
        })
        this.setState({filename});
        console.log(filename,'filename')
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const { title, visible, onOk, onCancel} = this.props;
    const { filename } = this.state;
    const props = {
      name: 'file',
      action: '/v1/common/upload',
      headers: {
        //
      },
      onChange:(info)=> this.onChange(info)
    };
    return (
      <Modal title={title}
        maskClosable={false}
        visible={visible}
        onOk={()=>{onOk(filename)}}
        onCancel={onCancel}
      >
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
      </Modal>
    )
  }
}

Index.propTypes = {
};

export default Index;
