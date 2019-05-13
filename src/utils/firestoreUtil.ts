import FirebaseAppUtil from './firebaseAppUtil';
import { firestore } from 'firebase';

/** チャットメッセージ型 */
export type message = {
    /** 本文 */
    body : string,

    /** 投稿者 */
    user : string,

    /** 投稿日 */
    timestamp : Date
};

/** チャットメッセージ型(firebase - get) */
type getFireMessage = {
    /** 本文 */
    body : string,

    /** 投稿者 */
    user : string,

    /** 投稿日 */
    timestamp : firestore.Timestamp
};

/** チャットメッセージ型(firebase - add) */
type addFireMessage = {
    /** 本文 */
    body : string,

    /** 投稿者 */
    user : string,

    /** 投稿日 */
    timestamp : firestore.FieldValue
}

/** メッセージ */
export default class Messages {

    collectionName = 'messages';
    
    /** データ取得 */
    get(callBack : (id : string, data : message) => void, pageSize : number = 10) {
        let db = firestore(FirebaseAppUtil.fireApp);

        // コレクション参照
        let dataRef = db.collection(this.collectionName);

        // 上位10件
        let topRef = dataRef.orderBy('timestamp', 'desc').limit(pageSize);

        // 変更をリッスン
        topRef.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if(doc.exists)
                {
                    doc.ref.get().then(
                        (docSnapShot) => {
                            if(docSnapShot.exists)
                            {
                                let data = docSnapShot.data();
                                if(data)
                                {
                                    let typedData : getFireMessage = data as getFireMessage;
                                    let ret : message = {
                                        body : typedData.body,
                                        user : typedData.user,
                                        timestamp : (typedData.timestamp)? typedData.timestamp.toDate() : new Date()
                                    };
                                    callBack(doc.id, ret);
                                }
                            }
                        },
                        (err) => {
                            alert(err);
                        }
                    );
                }
            });
        });
    }

    /** データ追加 */
    add(data : message) {
        let fireData : addFireMessage = {
            body : data.body,
            user : data.user,
            timestamp : firestore.FieldValue.serverTimestamp()
        };
        let db = firestore(FirebaseAppUtil.fireApp);

        db.collection(this.collectionName).add(fireData).then(
            (data) => {
            },
            (err) => {
                alert(err);
            }
        );
    }
}