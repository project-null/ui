import ajax from './ajax';

const Index = {
    getImg:(params)=>{ return ajax.get(`/channel/listjson?pn=0&rn=${params.rn}&tag1=${params.tag1}&tag2=${params.tag2}&ftags=${params.ftags}&ie=utf8`)},

    createFolder: (body) => { return ajax.post('/v1/favorites/folder', body) },
    deleteFolder: (id) => { return ajax.delete(`/v1/favorites/folder/${id}`) },

    editFolder: (id,body) => { return ajax.put(`/v1/favorites/folder/${id}`, body) },
    importWebsite:(body) => { return ajax.post('/v1/favorites/website/import', body) },
    createWebsite:(body) => { return ajax.post('/v1/favorites/website', body) },
  

    getWebsite:() => { return ajax.get('/v1/favorites/website') },
    getFolder:() => { return ajax.get('/v1/favorites/folder') },
    // getFavorites : (query) => { return ajax.post('/graphql',query) },

}

export default Index;
