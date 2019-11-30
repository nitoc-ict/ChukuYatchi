import WebView from 'react-native-webview';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default class WebViewCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    const {onLoad, variables} = this.props;
    Object.keys(variables).forEach((name) => {
      this.webview.injectJavaScript(`var ${name} = ${JSON.stringify(variables[name])};`);
    });
    this.webview.injectJavaScript(`
      var canvas = document.querySelector('canvas');
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      try {
        (${onLoad.toString()}).apply(null, [canvas, window.ReactNativeWebView.postMessage]);
      } catch (e) {
        window.ReactNativeWebView.postMessage('error: ' + e.message);
      }
    `);
  }

  render() {
    const {width, height} = this.props;
    const html = `
      <html>
        <head></head>
        <body style="margin: 0;">
          <canvas width="${width}" height="${height}" />
        </body>
      </html>
    `;
    return (
      <View style={{width, height}}>
        <WebView
          style={{width: '100%', height: '100%'}}
          ref={(ref) => {
            if (ref) {
              this.webview = ref;
            }
          }}
          originWhitelist={["*"]}
          source={{html}}
          onLoad={this.onLoad}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
          onError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />
      </View>
    );
  }
}

WebViewCanvas.defaultProps = {
  variables: {}
};

WebViewCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
  variables: PropTypes.object
};
