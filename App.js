import * as React from 'react';
import {WebView} from 'react-native-webview';
import WebViewCanvas from './components/WebViewCanvas'
import LocalHtmlView from './components/LocalHtmlView'

// const src = require('./assets/animations/opening.html')
const src = require('./assets/animations/opening.html')

export default class App extends React.Component {
  render() {
    return (
      <LocalHtmlView file={src}/>
    );
  }
}

