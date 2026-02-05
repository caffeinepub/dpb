import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LevelState {
    lastUnlockedLevel: bigint;
    completedLevels: Array<bigint>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLevelState(gameId: string): Promise<LevelState>;
    getUserLevelState(user: Principal, gameId: string): Promise<LevelState>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    resetProgress(gameId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCompletedLevel(gameId: string, levelNumber: bigint): Promise<LevelState>;
    unlockLevel(gameId: string, levelNumber: bigint): Promise<LevelState>;
}
