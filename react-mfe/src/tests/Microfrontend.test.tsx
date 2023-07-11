import React from 'react';
import '@testing-library/jest-dom';

import { renderWithTestI18n, screen, testI18nInstance } from './test-utils';
import { Information } from '../components/Information';
import enMfeTranslations from '../../public/locales/en/mfe.json';

describe('Microfrontend Information', () => {
  beforeEach(() => {
    console.log('new');
    console.log(testI18nInstance.getResourceBundle('en', 'error'));
    renderWithTestI18n(<Information />);
  });

  it('shows the introductory text', () => {
    screen.getByText(enMfeTranslations.GREETING);
    screen.getByText('The MFE is able to use translations from the host such as: NAME'); // for translations from the host, we can only assert on the key
    screen.getByText(
      "What about interpolation? If it's simple enough you can directly use the `t` function and pass in variables. If you need to embed HTML, then you will need to use the `Trans` component. Using `transSupportBasicHtmlNodes` we can simplify some boilerplate around HTML tags typically used to style a subset of the text like bold and italics. For more complicated elements, we need to pass in a `components` prop. See following examples:"
    );
  });

  it('shows the error messages properly', () => {
    expect(screen.getByTestId('interpolation-example')).toHaveTextContent('Something went wrong! :)');
    screen.getByText('Message us at fakeemail@fakeemail.com for help!');
  });
});

/*
// for a set up where you are mocking i18n and translations
describe('Microfrontend Information - Mock I18n', () => {
  // enable `react-i18next.js` in mocks folder for these tests to run
  beforeEach(() => {
    render(<Information />);
  });

  it('shows the introductory text', () => {
    screen.getByText('GREETING'); // t('GREETING') or t('GREETING', { ns: mfe })
  });

  it('shows the error messages properly', () => {
    expect(screen.getByTestId('interpolation-example')).toHaveTextContent('error:GENERIC_ERROR'); // if namespace embedded
    screen.getByText('error:ERROR_HELP');
  });
});
*/
