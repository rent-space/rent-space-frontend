import Loading from "@/components/Loading";
import { useMessages } from "@/hooks/useMessages";
import { DEFAULT_LANGUAGE } from "@/utils/constants";
import { getCookie } from "cookies-next";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: React.ReactNode;
};

export function TranslationProvider(props: Props) {
  const { children } = props;

  const language = getCookie("language") || DEFAULT_LANGUAGE;

  const { data: messages, loading } = useMessages(language);

  if (loading) {
    return <Loading loadingLabel="Carregando mensagens" />;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={language}>
      {children}
    </NextIntlClientProvider>
  );
}
