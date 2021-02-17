module.exports = {
    contract: 'TLWHHVXgrkEfVuRkwgGeToUPEBEMyFCA65',
    host: 'https://api.shasta.trongrid.io',
    path: {
        home: '/',
        login: '/login.html',
        signup: '/signup.html',
        notfound: '/notfound.html',
        invite: '/invite.html',
        mypage: (id) => ('/mypage.html' + (id ? "?/" + id : "")),
        lottopage: './lotto.html'
    }
}