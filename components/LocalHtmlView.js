import React, { useState, useEffect } from 'react'
import { WebView, Platform } from 'react-native'
import { Asset } from 'expo-asset'

const html = require('../assets/phina.html')

export default (props) => {
  const [file, setFile] = useState(null)
  const fileName = props.fileName

  const download = async () => {
    let file = Asset.fromModule(html)
    if (file.localUri !== null) {
      return file
    }
    await file.downloadAsync() // Optional, saves file into cache
    console.log('file', file)
    return file
  }

  const getSource = (file) => {
    if (Platform.OS !== 'android') {
      return html
    }
    if (file === null) {
      return {}
    }

    return {
      uri: file.localUri
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      download().then((downloadFile) => {
        setFile(downloadFile)
      })
    }
  }, [])

  return (
    <WebView
      allowFileAccess={true}
      source={getSource(file)}
    />
  )
}

