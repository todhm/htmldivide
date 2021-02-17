export function checkTronWeb() {
    if (!(window.tronWeb && window.tronWeb.defaultAddress.base58)) {
        alert('install tronlink.')
        return false
    }

    if (window.tronWeb.fullNode.host != domains.host) {
        alert('set network to shasta network.')
        return false
    }

    return true
}