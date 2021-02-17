module.exports = {
    contract: 'TLWHHVXgrkEfVuRkwgGeToUPEBEMyFCA65',
    host: 'https://api.shasta.trongrid.io',
    path: {
        home: '/',
        login: '/login',
        signup: '/signup',
        mypage: (id) => ('/mypage' + (id ? "/" + id : "")),
        lottopage: './lottery'
    }
}