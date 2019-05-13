import React from 'react';
import styles from './userAccountStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { signIn, signOut } from '../../utils/authUtil';
import { auth } from 'firebase/app';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

/** プロパティ型定義 */
interface Prop extends WithStyles<typeof styles> {
  /** 認証ステータス変更時コールバック */
  onAuthStateChanged? : (user : firebase.User | null) => void
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

/** ステート型定義 */
type State = {
  /** 認証ステータス */
  authorized : authStatus,

  /** ユーザー情報 */
  userInfo : userInfo | null
};

/** コンポーネント定義 */
class UserAccount extends React.Component<Prop, State> {

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
      userInfo : null
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

    // 認証成功している場合、ユーザー情報を取得
    if(user)
    {
      status = 'signIn';
      userInfo.avatorUrl = '';
      userInfo.name = (user.displayName)? user.displayName : 'unknown';
      userInfo.email = (user.email)? user.email : '';
    }

    // ステートに値をセット
    this.setState({
      authorized : status,
      userInfo : userInfo
    });

    // プロパティで指定されたコールバックを呼び出し
    if(this.props.onAuthStateChanged)
    {
      this.props.onAuthStateChanged(user);
    }
  }

  /** サインイン */
  signInHandler = () => {
    signIn();
  }

  /** サインアウト */
  signOutHandler = () => {
    signOut();
  }

  /** サインイン状態取得中カード描画 */
  renderInitCard() : JSX.Element {
    return (<CircularProgress className={this.props.classes.progress} />);
  }

  /** サインインカード描画 */
  renderSignInCard() : JSX.Element {
    return (
      <Button
        variant='text'
        size='small'
        onClick={this.signInHandler}>
        <Avatar className={this.props.classes.avater} >
          <PersonAdd />
        </Avatar>
      </Button>
    );
  }

  /** ユーザー情報カード描画 */
  renderUserCard() : JSX.Element {
    let title = '';
    let avator = <AccountCircle />;

    if(this.state.userInfo)
    {
      title = this.state.userInfo.name;
      if(this.state.userInfo.avatorUrl.length > 0)
      {
        avator = <img src={this.state.userInfo.avatorUrl} />;
      }
    }

    return (
      <Button
        variant='text'
        size='small'
        onClick={this.signOutHandler}
        title={title}>
        <Avatar className={this.props.classes.avater} >
          {avator}
        </Avatar>
      </Button>
    );
  }

  /** レンダリング */
  render() {

    // サインイン状態によって描画を切替
    let card : JSX.Element = this.renderInitCard();
    switch(this.state.authorized)
    {
      case 'init' :
        card = this.renderInitCard();
        break;
      case 'signIn' :
        card = this.renderUserCard();
        break;
      case 'signOut' :
        card = this.renderSignInCard();
        break;
    }

    return (
      <React.Fragment>
        {card}
      </React.Fragment>
    );
  }
}

/** テーマとスタイルをプロパティに含めて返却 */
export default withStyles(styles, { withTheme : true })(UserAccount);