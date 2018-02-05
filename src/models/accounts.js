import ajax from './ajax';

const Index = {
    getAllAccount: () => { return ajax.get('/v1/accounts') },
    save: (body) => { return ajax.post('/v1/accounts', body) }
}

export default Index;