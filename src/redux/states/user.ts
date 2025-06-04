import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";
import { PersistCookieUser, PersistLocalStorage, clearLocalStorage } from "../../utilities";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const EmptyUserState: UserInfo ={
    id: 0,
    name: "",
    email: "",
    role: "",
    exp: 0,
    image: ""
}



export const userKey = 'user';
export const userTokeb = 'token';


export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : EmptyUserState,
    reducers: {
        createUser: (_state, action) => {
            console.log('Payload recibido en createUser:', action.payload); // Verifica la estructura del payload
            const { token, user } = action.payload;
            
            const jwtPayload: JwtPayload & { name?: string, email?: string, role?: string, id?: number, exp: number } = jwtDecode(token);
            const userData: UserInfo = {
                id: jwtPayload.id as number, // Suponiendo que "sub" contiene el ID del usuario
                exp: jwtPayload.exp as number, // Suponiendo que "sub" contiene el ID del usuario
                name: jwtPayload.name || "name", // Asegúrate de que exista un campo "name"
                email: jwtPayload.email || "email", // Verifica que el email esté en el token
                role: jwtPayload.role || "user",
                image: user.image || "",
            };
            PersistLocalStorage<UserInfo>(userKey, userData)
            PersistCookieUser(token)
            return userData},
        updateUser: (state, action) => {
            const result = {...state, ...action.payload};
            PersistLocalStorage<UserInfo>(userKey,result)
            return result;
        },
        resetUser: () => {
            clearLocalStorage(userKey);
            return EmptyUserState}
        
    }
});

export const { createUser, updateUser, resetUser} = userSlice.actions;

export default userSlice.reducer; 