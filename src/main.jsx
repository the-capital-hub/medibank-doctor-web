import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client'
import client  from './graphql/client.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { Provider} from 'react-redux'
import store, { persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          success: {
            background: '#4CAF50',
            color: 'white'
          },
          error: {
            background: '#f44336',
            color: 'white'
          }
        }}
      />
   
    </StrictMode>
  </ApolloProvider>,
)