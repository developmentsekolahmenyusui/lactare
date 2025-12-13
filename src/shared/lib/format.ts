export const currencyFmt = Intl.NumberFormat('id-ID', {
  currency: 'IDR',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
