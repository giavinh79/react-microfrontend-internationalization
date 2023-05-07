import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const TestComponentForInterpolation = () => {
  return <>{':)'}</>;
};

export const Information = () => {
  const { t } = useTranslation(['mfe', 'error', 'host-common']);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #e8e8e8',
        padding: '1rem',
      }}
    >
      <p>{t('GREETING', { ns: 'mfe' })}</p>
      <p>The MFE is able to use translations from the host such as: {t('host-common:NAME')}</p>

      <p>
        {
          "What about interpolation? If it's simple enough you can directly use the `t` function and pass in variables. If you need to embed HTML, then you will need to use the `Trans` component. Using `transSupportBasicHtmlNodes` we can simplify some boilerplate around HTML tags typically used to style a subset of the text like bold and italics. For more complicated elements, we need to pass in a `components` prop. See following examples:"
        }
      </p>

      <p data-testid='interpolation-example'>
        <Trans t={t} i18nKey='error:GENERIC_ERROR' components={{ smiley: <TestComponentForInterpolation /> }} />
      </p>

      {t('error:ERROR_HELP', {
        contact: 'fakeemail@fakeemail.com',
      })}
    </div>
  );
};
