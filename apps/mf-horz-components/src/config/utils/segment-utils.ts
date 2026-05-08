const AUDIENCE_ID = 'browsing-interest';
const HISTORY_WINDOW = 10;

export interface SegmentData {
  interest?: string;
  history?: string[];
  signals?: Record<string, unknown>;
}

export function getSegmentFromCookie(
  cookieHeader?: string
): SegmentData | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/_jg_segment=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

export function getAudienceId(): string {
  return AUDIENCE_ID;
}

export interface PrimaryInterestResult {
  interest: string;
  confidence: number;
}

export function computePrimaryInterest(
  history: string[]
): PrimaryInterestResult {
  if (!history || history.length === 0) {
    return { interest: '', confidence: 0 };
  }

  const windowSlice = history.slice(-HISTORY_WINDOW);
  const counts = new Map<string, number>();

  windowSlice.forEach((category, index) => {
    const weight = index + 1;
    counts.set(category, (counts.get(category) ?? 0) + weight);
  });

  let maxCount = 0;
  let primary = '';

  counts.forEach((count, category) => {
    if (count > maxCount) {
      maxCount = count;
      primary = category;
    }
  });

  const totalWeight = windowSlice.reduce((sum, _, i) => sum + (i + 1), 0);
  const confidence = totalWeight > 0 ? maxCount / totalWeight : 0;

  return { interest: primary, confidence };
}
