import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const initialState ={
    status:'', data: null
}

export const imageUpload = createAsyncThunk(
    'image/upload',
    async (image:any) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'krrzkmpy')
        data.append('cloud_name', 'djyrozls7')
        const response = await fetch('https://api.cloudinary.com/v1_1/djyrozls7/image/upload', {
            method: 'post',
            body: data
        }).then((resp) => resp.json())
            .then((json) => json)
            .catch((err) => err)
        return response
    }
)

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(imageUpload.pending, (state: any, action) => {
            state.status = 'pending',
                state.data = action.payload
        })
        builder.addCase(imageUpload.fulfilled, (state: any, action) => {
            state.status = 'success',
                state.data = action.payload
        })
        builder.addCase(imageUpload.rejected, (state: any, action) => {
            state.status = 'failed'
            state.data = action.payload
        })
    }
});

export default imageSlice.reducer