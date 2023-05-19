import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export interface loginType {
    id: string
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};


export const registerUser = createAsyncThunk(
    'auth/register',
    async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.tokens) {
                    localStorage.setItem("user", JSON.stringify(json));
                }
                return json
            });
        return response
    }
)

export const sendVerification = createAsyncThunk(
    'auth/send-verification',
    async (data:{email: string, token: string}) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/send-verification-email`, {
            method: 'POST',
            body: JSON.stringify({email: data.email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${data.token}`
            },
        })
            .then((response) => response.status)
        return response
    }
)

export const verifyAccount = createAsyncThunk(
    'auth/verify-account',
    async (token) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/verify-email?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.status)
        return response
    }
)


export const loginUser = createAsyncThunk(
    'auth/login',
    async (initialPost) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify(initialPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.tokens) {
                    localStorage.setItem("user", JSON.stringify(json));
                }
                return json
            });
        return response
    }
)


export const logout = createAsyncThunk("auth/logout", async () => {
    await localStorage.removeItem("user");
});
export const handleForgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data) => {
        console.log(data)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/forgot-password`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.status)
        return response
    }
)

export const handleResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data: { password: string, token: string }) => {

       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/reset-password?token=${data?.token}`, {
            method: 'POST',
            body: JSON.stringify({password: data.password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.status)
        return response
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (data: { refreshToken: string }) => {
        console.log(data)
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/refresh-tokens`, {
            method: 'POST',
            body: JSON.stringify({refreshToken: data.refreshToken}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
           .then((json)=> json)
        if (response.code === 401) {
            console.log(response.code)
            localStorage.removeItem('user')
        }
        return response
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state: any, action) => {
            state.isLoggedIn = false,
                state.user = action.payload
        })
        builder.addCase(registerUser.fulfilled, (state: any, action) => {
            state.isLoggedIn = false,
                state.user = action.payload
        })
        builder.addCase(sendVerification.pending, (state: any, action) => {
            state.user = action.payload
        })
        builder.addCase(sendVerification.fulfilled, (state: any, action) => {
            state.user = action.payload
        })
        builder.addCase(refreshToken.pending, (state: any, action) => {
            state.user = action.payload
        })
        builder.addCase(refreshToken.fulfilled, (state: any, action) => {
            state.user.tokens = action.payload
        })
        builder.addCase(handleResetPassword.fulfilled, (state: any) => {
            state.status = 'success'
        })
        builder.addCase(handleResetPassword.rejected, (state: any) => {
            state.status = 'rejected'
        })
        builder.addCase(logout.fulfilled, (state: any) => {
            state.isLoggedIn = false,
                state.user = null
        })
        builder.addCase(loginUser.pending, (state: any, action) => {
            state.isLoggedIn = false,
                state.user = action.payload
        })
        builder.addCase(loginUser.fulfilled, (state: any, action) => {
            state.isLoggedIn = true,
                state.user = action.payload
        })
    }
});


export default authSlice.reducer