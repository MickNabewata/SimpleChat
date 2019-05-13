/** ページ */
type page = {
    /** 相対パス */
    path : string,
    /** 名称 */
    name : string
}

/** ページ一覧 */
const pages = {
    /** ホーム */
    home : {
        path :  '/',
        name : 'ホーム'
    } as page,

    /** チャットルーム */
    chatRoom : {
        path :  '/chatRoom',
        name : 'チャットルーム'
    } as page
}

export default pages;