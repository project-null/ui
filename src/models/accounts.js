import ajax from './ajax';

const Index = {
    getAllAccount: () => { return ajax.get('/v1/accounts') },
    save: (body) => { return ajax.post('/v1/accounts', body) },
    update: (body) => { return ajax.put('/v1/accounts', body) },
    delete: (uuid) => { return ajax.delete(`/v1/accounts/${uuid}`) }
}

export default Index;