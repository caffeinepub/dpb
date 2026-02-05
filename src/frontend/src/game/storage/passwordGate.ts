import { STORAGE_KEYS, REQUIRED_PASSWORD } from '../constants';

export function checkPassword(password: string): boolean {
  return password === REQUIRED_PASSWORD;
}

export function isPasswordUnlocked(): boolean {
  const value = localStorage.getItem(STORAGE_KEYS.PASSWORD_UNLOCKED);
  // Only return true if explicitly set to 'true', any other value (including null, undefined, or malformed) is locked
  return value === 'true';
}

export function unlockPassword(): void {
  localStorage.setItem(STORAGE_KEYS.PASSWORD_UNLOCKED, 'true');
}

export function lockPassword(): void {
  // Remove the key entirely to ensure locked state
  localStorage.removeItem(STORAGE_KEYS.PASSWORD_UNLOCKED);
}
