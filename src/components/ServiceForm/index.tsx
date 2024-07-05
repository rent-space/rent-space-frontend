import { Service, ServicePayload } from "@/utils/types";

interface FormProps {
  service?: Service;
  handleSubmit: (service: ServicePayload, id?: number) => Promise<any>;
}

export default function ServiceForm(props: FormProps) {
  return <div>ServiceForm</div>;
}
