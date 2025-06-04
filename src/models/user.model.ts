import { StoredFile } from "./GoogleCloud/StoredFile";

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    role: string,
    exp: number;
    image: string;
}

export interface UserDTO {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    photo: StoredFile;
}