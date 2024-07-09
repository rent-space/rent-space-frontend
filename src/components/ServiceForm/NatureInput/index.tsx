import { Input } from "@/components/Input";
import { getServiceTypes } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

type Option = { value: string; label: string };

export default function NatureInput(props: Props) {
  const { value, setValue } = props;

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getServiceTypes().then((rawTypes) => {
      const types: Option[] = rawTypes[0]
        .slice(1, -1)
        .split(",")
        .map((type) => ({ value: type, label: type }));

      setOptions(types);
    });
  }, []);

  return (
    <Input
      name="nature"
      label="Natureza do serviço"
      type="select"
      value={value}
      setValue={setValue}
      options={options}
      required
    />
  );
}
