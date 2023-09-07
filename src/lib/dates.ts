type Format = 'DD Month YYYY' | 'DD/MM/YY HH:mm' | 'N X ago';

export function formatDate(date: Date, format: Format) {
  if (format === 'DD Month YYYY') {
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
  }
  if (format === 'DD/MM/YY HH:mm') {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  if (format === 'N X ago') {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
  }
}
