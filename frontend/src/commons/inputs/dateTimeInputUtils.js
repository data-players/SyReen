import frLocale from 'date-fns/locale/fr';

export const futureDate = (value) => {
  if (value && Date.parse(value) <= Date.parse(new Date())) {
    return 'Doit être dans le futur';
  }
};

export const dateTimeInputProps = {
  options: {
    format: 'dd/MM/yyyy à HH:mm',
    ampm: false,
    clearable: true,
  },
  providerOptions: {
    locale: frLocale,
  },
  fullWidth: true,
  allowClear: true,
};