import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenVerified, loginUser } from "../services/authService";
import { useNavigate } from "react-router";

export interface User {
    name: string;
    email: string;
}

export type UserDataResponse = {
    message: string;
    name: string;
    email: string;
} | null;

export interface AuthUser {
    user: User | null;
    isLoggedin: boolean;

}

// Initial user
const initialUser: AuthUser = {
    user: null,
    isLoggedin: false,
};
const navigate = useNavigate()

// authSlice
const authSlice = createSlice({
    name: "auth",
    initialState: initialUser,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // action.payload = ket qua return tu function async
            .addCase(checkToken.fulfilled, (state, action) => {
                state.isLoggedin = true
                state.user = action.payload
            })
            .addCase(checkToken.rejected, (state) => {
                state.user = null
                state.isLoggedin = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedin = true
                if (action.payload && state.user) {
                    state.user.email = action.payload.email
                    state.user.name = action.payload.name
                }
                navigate("/chat")
            })
            .addCase(login.rejected, (state) => {
                state.user = null
                state.isLoggedin = false
            })
    }
})

export const checkToken = createAsyncThunk(
    "auth/checkToken",
    async (_, { rejectWithValue }) => {
        try {
            return await getTokenVerified();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const login = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string, password: string }, {rejectWithValue}
    ) => {
        try {
            const loginData: UserDataResponse = await loginUser(email, password);
            return loginData
        } catch (error: any) {
            return rejectWithValue(error.message);
        }}
)

export default authSlice.reducer