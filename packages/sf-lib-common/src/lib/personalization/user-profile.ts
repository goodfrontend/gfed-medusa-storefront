const PROFILE_KEY = 'jg_user_profile';

export interface UserProfile {
  interest: string;
  primaryInterest: string;
  confidence: number;
  history: string[];
  signals: Record<string, unknown>;
  lastUpdated: number;
}

function defaultProfile(): UserProfile {
  return {
    interest: '',
    primaryInterest: '',
    confidence: 0,
    history: [],
    signals: {},
    lastUpdated: Date.now(),
  };
}

function isValidUserProfile(value: unknown): value is UserProfile {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.interest === 'string' &&
    typeof obj.primaryInterest === 'string' &&
    typeof obj.confidence === 'number' &&
    Array.isArray(obj.history) &&
    obj.history.every((h) => typeof h === 'string') &&
    typeof obj.signals === 'object' &&
    typeof obj.lastUpdated === 'number'
  );
}

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return defaultProfile();

  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) return defaultProfile();
    const parsed = JSON.parse(stored);
    return isValidUserProfile(parsed) ? parsed : defaultProfile();
  } catch {
    return defaultProfile();
  }
}

export function updateUserProfile(updates: Partial<UserProfile>): void {
  if (typeof window === 'undefined') return;

  const profile = getUserProfile();
  const updated = { ...profile, ...updates, lastUpdated: Date.now() };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
}

export function addToHistory(category: string): void {
  const profile = getUserProfile();
  const normalizedCategory = String(category).trim();
  if (!normalizedCategory) return;
  const history = [...(profile.history || []), normalizedCategory].slice(-20);
  updateUserProfile({ history });
}
