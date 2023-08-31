type Format = 'DD Month YYYY' | 'DD/MM/YY HH:mm';

export function formatDate(date: Date, format: Format) {
  if (format === 'DD Month YYYY') {
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
  }
  if (format === 'DD/MM/YY HH:mm') {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
