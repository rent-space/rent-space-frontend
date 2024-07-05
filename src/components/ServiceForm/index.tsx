import { Service, ServicePayload } from "@/utils/types";
import { Form } from "@/components/Form";

interface FormProps {
  service?: Service;
  handleSubmit: (service: ServicePayload, id?: number) => Promise<any>;
}

export default function ServiceForm(props: FormProps) {
  return (
    <Form
      name="Serviço"
      title="Cadastro de Serviço"
      subtitle="Adicione abaixo as informações que serão exibidas sobre o seu serviço oferecido"
      loading={false}
      isCreating={true}
      onSubmit={() => {}}
    ></Form>
  );
}
