export function formatChatTimestamp(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffHours < 24) {
    // Within 24 hours → return time like "3:45 PM"
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
}

export const formateDateLabel = (msg) => {
  const today = new Date();
  const msgDate = new Date(msg.createdAt);

  const isToday = today.toDateString() === msgDate.toDateString();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (msgDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (isToday) {
    return "Today";
  } else {
    const daysAgo = Math.floor((today - msgDate) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} week(s) ago`;
    return msgDate.toLocaleDateString();
  }
};
