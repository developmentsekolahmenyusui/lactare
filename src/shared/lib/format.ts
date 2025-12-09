export const currencyFmt = Intl.NumberFormat('id-ID', {
  currency: 'IDR',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const dateFmt = new Intl.DateTimeFormat('en-EN', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
