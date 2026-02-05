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
    getLevelState(): Promise<LevelState>;
    getPromisesKeptLevelState(): Promise<LevelState>;
    getPromisesKeptUserLevelState(user: Principal): Promise<LevelState>;
    getQuizLevelState(): Promise<LevelState>;
    getQuizUserLevelState(user: Principal): Promise<LevelState>;
    getUserLevelState(user: Principal): Promise<LevelState>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    resetProgress(): Promise<void>;
    resetPromisesKeptProgress(): Promise<void>;
    resetQuizProgress(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCompletedLevel(levelNumber: bigint): Promise<LevelState>;
    savePromisesKeptLevelCompleted(levelNumber: bigint): Promise<LevelState>;
    saveQuizLevelCompleted(levelNumber: bigint): Promise<LevelState>;
    unlockLevel(levelNumber: bigint): Promise<LevelState>;
    unlockPromisesKeptLevel(levelNumber: bigint): Promise<LevelState>;
    unlockQuizLevel(levelNumber: bigint): Promise<LevelState>;
}
