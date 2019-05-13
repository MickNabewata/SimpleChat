import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import FirebaseAppUtil from './utils/firebaseAppUtil';

// firebase初期化
FirebaseAppUtil.init();

// ルート要素のレンダリング
ReactDOM.render(<App />, document.querySelector('#root'));

/*
アプリケーションをオフライン状態でよりスムーズに動作させるには、
unregister()メソッドの代わりにregister()メソッドを呼び出します。
この変更によりサービスワーカーが起動するようになるので、
それに伴った落とし穴があることに注意してください。
サービスワーカーについては、以下の日本語サイトが分かりやすいです。
　https://qiita.com/y_fujieda/items/f9e765ac9d89ba241154
詳細については、https://bit.ly/CRA-PWA を参照してください。
*/
serviceWorker.unregister();
