import ajax from './ajax';

const users = {
    getUser: () => { return ajax.get('/v1/users') }
}

export default users;