import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  LoginPage,
  SignupPage,
  AllAnimalsPage,
  AnimalDetailPage,
  CreateAnimalPage,
  EditAnimalPage,
  AboutPage,
  ContactPage,
  HomePage,
  ErrorPage,
} from "./pages/index.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout.jsx";
import AuthLayout from "./components/Layout/AuthLayout.jsx";
import { store } from "./features/store.js";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { Provider , useDispatch} from "react-redux";
import { useEffect } from "react";
import { verifyAuth } from "./features/user/userSlice.js";

function AuthInitializer() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyAuth())
  },[dispatch])
  return null
}

const router = createBrowserRouter(createRoutesFromElements([
  <Route element={<RootLayout/>} errorElement={<ErrorPage/>}>
    {/* Public Routes */}
    <Route index element={<HomePage/>}/>
    <Route path="about" element={<AboutPage/>}/>
    <Route path="contact" element={<ContactPage />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute/>}>
      <Route path="animals">
        <Route index element={<AllAnimalsPage/>}/>
        <Route path=":id" element={<AnimalDetailPage/>}/>
        <Route path=":id/edit" element={<EditAnimalPage/>}/>
        <Route path="new" element={<CreateAnimalPage/>}/>
      </Route>
    </Route>
  </Route>,

  // Error Routes
  <Route path="*" element={<ErrorPage />} />,

  //   Auth Routes (Login/Signup)
  <Route path="auth" element={<AuthLayout/>}>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>
    </Route>
]
))

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer/>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
