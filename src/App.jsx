import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import router from "./router"
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {

  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
