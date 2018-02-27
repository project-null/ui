import ajax from './ajax';

const users = {
    getUser: () => { return ajax.get('/v1/users') },
    login: (body) => { return ajax.post('/v1/users/login', body) },
    logout: () => { return ajax.delete(`/v1/users/logout`) },
    setDefaultToken: () => {
        if (!ajax.defaults.headers.common['token']) {
            let token = sessionStorage.getItem('token');
            ajax.defaults.headers.common['token'] = token
        }
    },
    setToken: (userInfo) => {
        document.cookie = `token:${userInfo.token}`;
        sessionStorage.setItem('token', userInfo.token);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        ajax.defaults.headers.common['token'] = userInfo.token
    }
};
users.setDefaultToken();

export default users;