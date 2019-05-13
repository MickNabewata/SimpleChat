import React, { KeyboardEvent, ChangeEvent } from 'react';
import styles from './chatRoomStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { auth } from 'firebase/app';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Messages, { message } from '../../utils/firestoreUtil';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';

/** プロパティ型定義 */
interface Prop extends WithStyles<typeof styles> {
}

/** 認証ステータス型 */
type authStatus = 'init' | 'signIn' | 'signOut';

/** ユーザー型 */
type userInfo = {
  /** サムネイル画像URL */
  avatorUrl : string,

  /** ユーザー名 */
  name : string,

  /** メールアドレス */
  email : string
};

/** メッセージ型定義 */
type Message = {
  /** ID */
  id : string,

  /** メッセージ */
  data : message
};

/** ステート型定義 */
type State = {
  /** 認証ステータス */
  authorized : authStatus,

  /** 入力中のメッセージ */
  messageText : string,

  /** ユーザー情報 */
  userInfo : userInfo | null,

  /** チャットメッセージ一覧 */
  messages : Message[]
};

/** コンポーネント定義 */
class ChatRoom extends React.Component<Prop, State> {

  /** コンストラクタ */
  constructor(props : Prop)
  {
    super(props);

    // 認証状態変更時のコールバック
    auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user);
    });

    // ステート初期化
    this.state = {
      authorized : 'init',
      messageText : '',
      userInfo : null,
      messages : []
    };
  }

  /** 認証状態変更時のコールバック */
  onAuthStateChanged(user : firebase.User | null) {
    // ステートにセットする初期値を生成
    let status : authStatus = 'signOut';
    let userInfo : userInfo = {
      avatorUrl : '',
      name : '',
      email : ''
    };

    // 認証成功
    if(user)
    {
      // ユーザー情報取得
      status = 'signIn';
      userInfo.avatorUrl = '';
      userInfo.name = (user.displayName)? user.displayName : 'unknown';
      userInfo.email = (user.email)? user.email : '';

      // チャットデータ取得 & 変更リッスン
      new Messages().get(this.onDataGet);
    }

    // ステートに値をセット
    this.setState({
      authorized : status,
      userInfo : userInfo
    });
  }

  /** データ取得成功コールバック(1件ずつ実行される) */
  onDataGet = (id : string, data : message) => {
    let messages = this.state.messages;

    let existMessage = messages.filter((m) => { return m.id === id; });
    if(existMessage == undefined || existMessage == null || existMessage.length == 0)
    {
        messages.push({id, data});
        this.setState({ messages : messages });
    }
  }

  /** 日付フォーマット */
  formatDate(date : Date) : string {
    let year = date.getFullYear().toString();
    let mondth = (date.getMonth() > 10)? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1)}`;
    let day = (date.getDate() >= 10)? date.getDate().toString() : `0${date.getDate()}`;
    let hours = (date.getHours() >= 10)? date.getHours().toString() : `0${date.getHours()}`;
    let minutes = (date.getMinutes() >= 10)? date.getMinutes().toString() : `0${date.getMinutes()}`;
    let seconds = (date.getSeconds() >= 10)? date.getSeconds().toString() : `0${date.getSeconds()}`;

    return `${year}年${mondth}月${day}日 ${hours}:${minutes}:${seconds}`;
  }

  /** サインイン状態取得中の描画 */
  renderInit() : JSX.Element
  {
    return (<CircularProgress className={this.props.classes.progress} />);
  }

  /** サインアウト状態の描画 */
  renderSignIn() : JSX.Element
  {
    return (
      <Typography component='p' className={this.props.classes.hello}>
        この画面はサインインが必要です。
      </Typography>
    );
  }

  /** メッセージ入力中キーボード押下イベント */
  messageKeyDown = (event : KeyboardEvent<HTMLDivElement>) => 
  {
    if(event.keyCode == 13 && this.state.messageText.length > 0)
    {
      // チャットデータ追加
      new Messages().add({
        body : this.state.messageText,
        user : (this.state.userInfo)? this.state.userInfo.name : '',
        timestamp : new Date()
      });

      // 入力値クリア
      this.setState({ messageText : '' });
    }
  }

  /** メッセージ入力欄変更イベント */
  onMessageTextChante = (event : ChangeEvent<HTMLInputElement>) => {
    this.setState({ messageText : event.target.value });
  };

  /** サインイン状態の描画 */
  renderChatRoom() : JSX.Element
  {
    let name = '';
    let account = '';
    if(this.state.userInfo)
    {
      name = this.state.userInfo.name;
      account = this.state.userInfo.email;
    }

    return (
      <React.Fragment>
        <Typography component='p' className={this.props.classes.hello}>
          ようこそ{name}さん！
        </Typography>
        <Paper className={this.props.classes.chatArea} >
          <TextField
            id="myMessage"
            label="メッセージ"
            margin="dense"
            variant="outlined"
            value={this.state.messageText}
            onKeyDown={this.messageKeyDown}
            onChange={this.onMessageTextChante}
            fullWidth
          />
          <Divider />
          <div className={this.props.classes.chatDispArea} >
            {this.state.messages.sort((m1, m2) => { return (m2.data.timestamp.getTime() - m1.data.timestamp.getTime()) }).map((message) => {
              return (message.data.user == account)?
                this.renderMyMessage(message.data) :
                this.renderSomeoneMessage(message.data);
            })}
          </div>
        </Paper>
      </React.Fragment>
    );
  }

  /** 自分のメッセージ描画 */
  renderMyMessage(data : message) : JSX.Element
  {
    return (
      <div className={this.props.classes.someOneMessage}>
        <Person className={this.props.classes.someOneIcon} />
        <div className={this.props.classes.someOneChatting}>
          <div className={this.props.classes.someOneSays}>
            <p className={this.props.classes.someOneSaysP}>
              {data.body}
            </p>
          </div>
        </div>
        <div className={this.props.classes.someOneInfo}>
          <div>{this.formatDate(data.timestamp)}</div>
          <div>{data.user}</div>
        </div>
      </div>
    );
  }
  
  /** 自分以外のメッセージ描画 */
  renderSomeoneMessage(data : message) : JSX.Element
  {
    return (
      <div className={this.props.classes.someOneMessage}>
        <Person className={this.props.classes.someOneIcon} />
        <div className={this.props.classes.someOneChatting}>
          <div className={this.props.classes.someOneSays}>
            <p className={this.props.classes.someOneSaysP}>
              {data.body}
            </p>
          </div>
        </div>
        <div className={this.props.classes.someOneInfo}>
          <div>{this.formatDate(data.timestamp)}</div>
          <div>{data.user}</div>
        </div>
      </div>
    );
  }

  /** レンダリング */
  render() {

    // サインイン状態を確認して描画を切替
    let room = this.renderInit();
    switch(this.state.authorized)
    {
      case 'init' :
        room = this.renderInit();
        break;
      case 'signIn' :
        room = this.renderChatRoom();
        break;
      case 'signOut' :
        room = this.renderSignIn();
        break;
    }

    // 描画
    return (
      <React.Fragment>
        {room}
      </React.Fragment>
    );
  }
}

/** テーマとスタイルをプロパティに含めて返却 */
export default withStyles(styles, { withTheme : true })(ChatRoom);