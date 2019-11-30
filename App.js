import * as React from 'react';
import {WebView} from 'react-native-webview';
import WebViewCanvas from './components/WebViewCanvas'
import LocalHtmlView from './components/LocalHtmlView'

const src = require('./assets/phina.html')

export default class App extends React.Component {
  render() {
    return (
      <LocalHtmlView file={src}/>
    );
  }
}

