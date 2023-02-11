import polyglotI18nProvider from 'ra-i18n-polyglot';
import raFrenchMessages from 'ra-language-french';
import { frenchMessages as authFrenchMessages } from '@semapps/auth-provider';
import frResourcesMessages from './messages/resources/fr';

const getMessages = (lang) => {
  if (lang === 'fr') {
    return {
      ...raFrenchMessages,
      ...authFrenchMessages,
      ...frResourcesMessages,
    };
  } else {
    throw new Error('Language not handled: ' + lang);
  }
};

const i18nProvider = polyglotI18nProvider(getMessages, process.env.REACT_APP_LANG);

export default i18nProvider;
