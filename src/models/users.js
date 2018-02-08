import ajax from './ajax';

const users = {
    getUser: () => { return ajax.get('/v1/users') },    
    login: (body) => { return ajax.post('/v1/users/login', body) }
}

export default users;