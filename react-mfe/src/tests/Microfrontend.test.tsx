import React from 'react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  queryByText,
  render,
  renderWithI18n,
  renderWithTestI18n,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from './test-utils';
import enMfeTranslations from '../../public/locales/en/mfe.json';

import { Information } from '../Microfrontend';

// describe('Microfrontend Information - Test I18n Config', () => {
//   beforeEach(() => {
//     renderWithTestI18n(<Information />);
//   });

//   it('shows the introductory text', () => {
//     screen.getByText('This is the microfrontend!');
//     screen.getByText(
//       "What about interpolation? If it's simple enough you can directly use the `t` function and pass in variables. If you need to embed HTML, then you will need to use the `Trans` component. Using `transSupportBasicHtmlNodes` we can simplify some boilerplate around HTML tags typically used to style a subset of the text like bold and italics. For more complicated elements, we need to pass in a `components` prop. See following examples:"
//     );
//   });

//   it('shows the error messages properly', () => {
//     expect(screen.getByTestId('interpolation-example')).toHaveTextContent('Something went wrong! :)');
//     screen.getByText('Message us at fakeemail@fakeemail.com for help!');
//   });
// });

// describe('Microfrontend Information - Actual I18n Config', () => {
//   beforeEach(async () => {
//     const result = renderWithI18n(<Information />);
//     await waitForElementToBeRemoved(() => queryByText(result.container, 'Loading...')); // for suspense + fallback
//   });

//   it('shows the introductory text', async () => {
//     screen.getByText('This is the microfrontend!');
//     screen.getByText(
//       "What about interpolation? If it's simple enough you can directly use the `t` function and pass in variables. If you need to embed HTML, then you will need to use the `Trans` component. Using `transSupportBasicHtmlNodes` we can simplify some boilerplate around HTML tags typically used to style a subset of the text like bold and italics. For more complicated elements, we need to pass in a `components` prop. See following examples:"
//     );
//   });

//   it('shows the error messages properly', () => {
//     expect(screen.getByTestId('interpolation-example')).toHaveTextContent('Something went wrong! :)');
//     screen.getByText('Message us at fakeemail@fakeemail.com for help!');
//   });
// });

describe('Microfrontend Information - Mock I18n', () => {
  // enable `react-i18next.js` in mocks folder for these tests to run
  beforeEach(() => {
    render(<Information />);

    // jest.mock('react-i18next', () => ({
    //   // this mock makes sure any components using the translate hook can use it without a warning being shown
    //   useTranslation: () => {
    //     return {
    //       t: (str: string) => str,
    //       i18n: {
    //         changeLanguage: () => new Promise(() => ({})),
    //       },
    //     };
    //   },
    //   initReactI18next: {
    //     type: '3rdParty',
    //     init: () => ({}),
    //   },
    // }));
    // jest.resetAllMocks();
  });

  it('shows the introductory text', () => {
    screen.getByText('GREETING'); // t('GREETING') or t('GREETING', { ns: mfe })
  });

  it('shows the error messages properly', () => {
    expect(screen.getByTestId('interpolation-example')).toHaveTextContent('error:GENERIC_ERROR'); // if namespace embedded
    screen.getByText('error:ERROR_HELP');
  });
});
