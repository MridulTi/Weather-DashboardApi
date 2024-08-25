import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Pages/More/MainLayout";
import { useAuth } from "./Context/Context";
import Login from "./Pages/Reg_Log/Login";
import Register from "./Pages/Reg_Log/Register";
import ErrorModal from "./Components/ErrorModal";
import AllPage from "./Pages/More/AllPage";

function App() {
  const {authPage}=useAuth()
  const router = createBrowserRouter([
    {
      path: "/",
      element:<AllPage/>,
      children:[
        {
          path:"",
          element:authPage=='login'?<Login/>:<Register/>,
        },
        {
          path:"Dashboard",
          element:<MainLayout/>,
          children:[
            {
              path: "",
              element: <Home/>,
            },
          ]
        },
      ]
    },
    
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
