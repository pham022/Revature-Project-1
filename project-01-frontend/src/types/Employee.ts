import {createContext} from 'react';

export interface Employee {
    id: number;
    username: string;
    password: string;
    isManager: boolean;
}

export interface LoginFormData {
    username: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    password: string;
    isManager: boolean;
}

export type AuthContextValue = {
    user: Employee | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string, isManager: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null> (null);