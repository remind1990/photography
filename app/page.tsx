import { useTranslations } from 'next-intl';
import Main from './pages/Main/Main';

export default function page() {
  const t = useTranslations('HomePage');
  return (
    <>
      <h1>{t('title')}</h1>
      <Main />
    </>
  );
}
