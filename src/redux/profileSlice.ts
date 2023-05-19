import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    status: '', data: null
}

export const getUserProfile = createAsyncThunk(
    'profile/get',
    async (data: any) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/users/${data.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'AUTHORIZATION': `Bearer ${data.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => json);
        return response
    }
)

export const updateUserProfile = createAsyncThunk(
    'profile/update',
    async (data: any) => {
        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/users/${data.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                profileImage: data.profileImage,
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                age: data.dob?moment().diff(moment(data.dob), 'years').toString():'',
                nationality: data.nationality,
                maritalStatus: data.maritalStatus,
                gender: data.gender,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'AUTHORIZATION': `Bearer ${user.tokens.access.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => json);
        return response
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(updateUserProfile.pending, (state: any, action) => {
            state.status = 'pending',
                state.data = action.payload
        })
        builder.addCase(updateUserProfile.fulfilled, (state: any, action) => {
            state.status = 'success',
                state.data = action.payload
        })
        builder.addCase(updateUserProfile.rejected, (state: any, action) => {
            state.status = 'failed'
            state.data = action.payload
        })
        builder.addCase(getUserProfile.pending, (state: any, action) => {
            state.status = 'pending'
            state.data = action.payload
        })
        builder.addCase(getUserProfile.fulfilled, (state: any, action) => {
            state.status = 'success'
            const newData = action.payload
            const nameArray = action.payload.name.split(' ')
            newData.firstName = nameArray[0]
            newData.lastName = nameArray[1]
            state.data = newData
        })
        builder.addCase(getUserProfile.rejected, (state: any, action) => {
            state.status = 'failed'
            state.data = action.payload
        })
    }
});

export default profileSlice.reducer