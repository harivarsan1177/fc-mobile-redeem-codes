export function formatDisplayDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'No date specified';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatRelativeTime(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Not checked yet';
  try {
    const d = new Date(dateStr);
    const now = Date.now();
    const diffMs = now - d.getTime();
    if (diffMs < 0) return 'Just now';

    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

    return formatDisplayDate(dateStr);
  } catch {
    return 'Recently';
  }
}
