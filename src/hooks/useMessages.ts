import { DEFAULT_LANGUAGE } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

export function useMessages(language: string | undefined = DEFAULT_LANGUAGE) {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetcher = useCallback(() => {
    const promise = import(`../../messages/${language}.json`).then(
      (module) => module.default
    );

    promise.then((data) => {
      setLoading(false);
      setData(data);
    });
  }, [language]);

  useEffect(() => {
    fetcher();
  }, [fetcher, language]);

  return {
    data,
    loading,
  };
}
