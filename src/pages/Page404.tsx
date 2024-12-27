import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('404')}</title>
      </Helmet>
      <div>
        404
      </div>
    </>
  );
}

export default Page404;
