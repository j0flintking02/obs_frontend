import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import SignIn from "../pages/SignIn.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import App from "../App.tsx";
import ErrorPage from "../pages/error-page.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import HomePage from "../pages/HomePage.tsx";
import {Register} from "../pages/Register.tsx";
import VerifyRegister from "../pages/feedback/VerifyRegister.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";
import SuccessPage from "../pages/feedback/SuccessPage.tsx";
import {store} from "../redux/store.ts";
import {Provider} from "react-redux";

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
describe("SignIn test", () => {
    test("should show form", () => {

        render(
            <Provider store={store}>
            <RouterProvider router={router}/>
            </Provider>);

        expect(screen.getByText(/Dashboard/i)).toBeDefined()
    })
})