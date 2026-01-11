import { RootProvider } from 'fumadocs-ui/provider';
import { I18nProvider, type Translations } from 'fumadocs-ui/i18n';
 
const cn: Partial<Translations> = {
  search: 'Translated Content',
  // other translations
};
 
// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: 'Japanese',
    locale: 'ja',
  },
];
 
export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;
 
  return (
    <html lang={lang}>
      <body>
        <I18nProvider
          locale={lang}
          locales={locales}
          translations={{ cn }[lang]}
        >
          <RootProvider>{children}</RootProvider>
        </I18nProvider>
      </body>
    </html>
  );
}