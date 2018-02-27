import ajax from './ajax';

const users = {
    getUser: () => { return ajax.get('/v1/users') },
    login: (body) => { return ajax.post('/v1/users/login', body) },
    setDefaultToken: () => {
        if (!ajax.defaults.headers.common['token']) {
            let token = sessionStorage.getItem('token');
            document.cookie = `token:${token}`;
            sessionStorage.setItem('token', token);
            ajax.defaults.headers.common['token'] = token
        }
    },
    setToken: (token) => {
        document.cookie = `token:${token}`;
        sessionStorage.setItem('token', token);
        ajax.defaults.headers.common['token'] = token
    }
};
users.setDefaultToken();

export default users;