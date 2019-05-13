import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './appStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import pages from '../../datas/pageData';
import Home from '@material-ui/icons/Home';
import Chat from '@material-ui/icons/Chat';
import withRoot from '../../withRoot';
import DrawerLayout, { NavLinks } from '../drawerLayout/drawerLayout';
import Hello from '../hello/hello';
import ChatRoom from '../chatRoom/chatRoom';

/** プロパティ型定義 */
interface Prop extends WithStyles<typeof styles> {
}

/** ステート型定義 */
interface State {
  /** 表示中ページのパス */
  currentPath : string
};

/** コンポーネント定義 */
class App extends React.Component<Prop, State> {

  /** コンストラクタ */
  constructor(props : Prop)
  {
    super(props);

    // ステート初期化
    this.state = {
      currentPath : location.pathname
    };
  }

  /** ナビゲーション発生時 */
  handleNavigate = (path : string) => {
    this.setState({ currentPath : path });
  };

  /** 固定のナビゲーション */
  staticLinks : NavLinks[] = [
    [
      {
        text : pages.home.name,
        url : pages.home.path,
        icon : <Home />,
        click : (event) => {
          this.handleNavigate(pages.home.path);
        },
        closeMenuAfterClick : true
      },
      {
        text : pages.chatRoom.name,
        url : pages.chatRoom.path,
        icon : <Chat />,
        click : (event) => {
          this.handleNavigate(pages.chatRoom.path);
        },
        closeMenuAfterClick : true
      }
    ]
  ];

  /** レンダリング */
  render() {
    return (
      <BrowserRouter>
        <DrawerLayout links={ this.staticLinks } currentPath={ this.state.currentPath } >
          <Route exact path={pages.home.path} component={() => { return <Hello /> }} />
          <Route exact path={pages.chatRoom.path} component={() => { return <ChatRoom /> }} />
        </DrawerLayout>
      </BrowserRouter>
    );
  }
}

/** テーマとスタイルをプロパティに含めて返却 */
export default withRoot(withStyles(styles, { withTheme : true })(App));