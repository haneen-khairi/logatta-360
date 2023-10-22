import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import UserContextProvider from '@/Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return <UserContextProvider>
    <ToastContainer />
    <NextUIProvider >
      <Component {...pageProps} />
    </NextUIProvider>
  </UserContextProvider>
}
