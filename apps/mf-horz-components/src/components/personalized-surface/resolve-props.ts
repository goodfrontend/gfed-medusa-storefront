function resolveAudienceValue(value: unknown): unknown {
  if (typeof value !== 'object' || value === null) return value;
  if ('_type' in value && 'active' in value) {
    const obj = value as Record<string, unknown>;
    return obj[obj.active as string] ?? obj.default ?? obj;
  }
  if ('asset' in value && '_type' in value) return value;
  return value;
}

export function resolveProps(props: Record<string, unknown>): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    resolved[key] = resolveAudienceValue(props[key]);
  }
  return resolved;
}