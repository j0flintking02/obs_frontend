import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom"

import './index.css'
import App from './App.tsx'
import SignIn from './pages/SignIn.tsx'
import ErrorPage from "./pages/error-page.tsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {Register} from "./pages/Register.tsx";
import VerifyRegister from "./pages/feedback/VerifyRegister.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SuccessPage from "./pages/feedback/SuccessPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/profile",
                element: <ProfilePage/>,
            }, {
                path: "/dashboard",
                element: <HomePage/>,
            },
        ]
    },
    {
        path: "/login",
        element: <SignIn/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/verify-email",
        element: <VerifyRegister/>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>,
    }, {
        path: "reset-password",
        element: <ResetPassword/>
    },
    {
        path: "/success",
        element: <SuccessPage/>,
    }

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <Provider store={store}>
            <RouterProvider router={router}/>
            </Provider>
        </DevSupport>
    </React.StrictMode>,
)
