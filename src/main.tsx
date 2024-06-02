import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify'
import amplifyconfig from './aws-exports.js'
import apigClientFactory from '../apigClient.js'

Amplify.configure(amplifyconfig)

declare global {
  interface Window {
    apigClientFactory: typeof apigClientFactory
  }
}

window.apigClientFactory = apigClientFactory

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
