import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.jsx'
import client from './graphql/client.js'
import store, { persistor } from "./Redux/store"

const toastConfig = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  style: {
    success: {
      background: '#4CAF50',
      color: 'white'
    },
    error: {
      background: '#f44336',
      color: 'white'
    }
  }
}

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ToastContainer {...toastConfig} />
    </StrictMode>
  </ApolloProvider>
)