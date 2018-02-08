import ajax from './ajax';

const users = {
    getUser: () => { return ajax.get('/v1/users') },
    login: (body) => { return ajax.post('/v1/users/login', body) },
    setToken: (token) => {
        document.cookie = `token:${token}`;
        sessionStorage.setItem('token', token);
        ajax.defaults.headers.common['token'] = token
    }
}

export default users;