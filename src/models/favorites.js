import ajax from './ajax';

const Index = {
    getImg:()=>{ return ajax.get('/channel/listjson?pn=0&rn=159&tag1=宠物&tag2=全部&ftags=气质&ie=utf8')},

    getAllFolder: () => { return ajax.get('/v1/favorites/folder') },

    save: (body) => { return ajax.post('/v1/accounts', body) },
    update: (body) => { return ajax.put('/v1/accounts', body) },
    delete: (uuid) => { return ajax.delete(`/v1/accounts/${uuid}`) },

    getAllWebsite: () => { return ajax.get('/v1/favorites/website') },
    test: () => { return ajax.post('/graphql',{
      query:`query{favorites {_id, name,desc,iconURL,url,folderID }}`
    }) },

}

export default Index;
