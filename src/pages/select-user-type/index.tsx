import Image from "next/image";

import { Header } from "@/components/Header";
import styles from './styles.module.css';

import EventOwner from '@/assets/eventOwner.svg';
import SpaceOwner from '@/assets/spaceOwner.svg';
import Service from '@/assets/service.svg';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { User } from "@/utils/types";
import { createUser, getUser } from "@/services/api/userService";
import { useRouter } from "next/router";

interface SelectionButtonProps {
  source: string,
  alt: string,
  text: string,
  selected: boolean,
  index: number,
  selectOption: Dispatch<SetStateAction<number>>
}

const SelectionButton = ({ source, alt, text, selected = false, selectOption, index }: SelectionButtonProps) => {
  return (
    <button 
      className={styles.selectionButton} 
      data-variant={selected ? 'selected' : ''}
      onClick={() => selectOption(index)}
    >
      <Image
        src={source}
        width={180}
        alt={alt}
      />
      <span className={styles.selectionSpan}>{text}</span>
    </button>
  )
}

export default function SelectUserType() {
  const { status, data } = useSession();
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const router = useRouter();

  useEffect(() => {
    async function userCreationOrLogin() {
      if (status === "authenticated") {
        if (data.user?.email) {
          const user: User = await getUser(data.user?.email);
          if (!user) {
            router.push("/select-user-type")
          } else {
            router.push("/home");
          }
        }
      } 
    }

    userCreationOrLogin();
  }, [])

  const selectionOptions = [
    { source: EventOwner, alt: "Organizador de eventos", text: "Sou um organizador de eventos"},
    { source: SpaceOwner, alt: "Proprietário de espaços", text: "Sou um proprietário de espaços"},
    { source: Service, alt: "Disponibilizador de serviços", text: "Sou um disponibilizador de serviços"},
  ]

  const getUserType = () => {
    if (selectedOption == 3) return "SERVICE_OFFER";
    else if (selectedOption == 2) return "SPACE_OWNER";
    else return "EVENT_OWNER"
  }

  const createUserWithType = async () => {
    if (data?.user?.name && data?.user?.email) {
      const userType = getUserType();

      const newUser: User = {
          userType: userType,
          name: data?.user?.name,
          profilePhoto: data?.user?.image ?? "",
          email: data?.user?.email,
          telephone: "",
          webSite: "",
        };
  
        await createUser(newUser);
    } else {
      console.log("Erro ao criar usuário")
    }
  }

  return (
    <>
      <div className={styles.pageBackground}></div>
      {/* <Header>
      </Header> */}

      <section className={styles.userTypeSelectCont}>
        <h1 className={styles.pageTitle}>Selecione o seu perfil de usuário para começar a utilizar a aplicação!</h1>
        <span className={styles.pageSubtitle}>Selecione a opção que mais se encaixa no seu objeto pois isso irá determinar as funcionalidades as quais
          você tem acesso dentro da plataforma e essa opção não poderá ser modificada posteriormente.
        </span>

        <div className={styles.selectionCont}>
          {selectionOptions.map((option, index) => (
            <SelectionButton 
              key={index} 
              index={index}
              source={option.source} 
              alt={option.alt} 
              text={option.text} 
              selectOption={(index) => setSelectedOption(index)}
              selected={selectedOption == index}
            />
          ))}
        </div>
      </section>

      {selectedOption !==  -1 &&
        <div className={styles.confirmSelection}>
          <Button
            variant="primary"
            size="small"
            onClick={createUserWithType}
          >
            Confirmar seleção
          </Button>
        </div>
      }
    </>
  )
}