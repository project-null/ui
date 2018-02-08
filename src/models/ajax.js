import axios from 'axios';

import { Modal } from 'antd';
const confirm = Modal.confirm;

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let response = error.response;

    if (response.status === 401) {
        confirm({
            title: '认证信息失效',
            content: '当前认证信息失效，是否重新登录',
            okText:'重新登录',
            cancelText:'取消',
            onOk() {
                location.pathname = "/";
            },
            onCancel() {

            },
        });
    }
    return Promise.reject(error);
});

export default axios;