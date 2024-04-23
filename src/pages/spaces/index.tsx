import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { NavBar } from "@/components/NavBar";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CardDescription } from "@/components/CardDescription";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from './styles.module.css';
import { FloatingButton } from "@/components/FloatingButton";
import { useState } from "react";
import MockImage from '@/assets/noImageFile.svg';

let mock = [
  {
    title: "Titulo do primeiro",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 300,
    pricePerHour: 120,
    image:"rentspace_logo.svg"
  },
  {
    title: "Titulo do segundo",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 200,
    pricePerHour: 2,
    image:"src/assets/rentspace_logo.svg"
  },
  {
    title: "Titulo do terceiro",
    description: "Uma descrição. Sim, isso e sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 150,
    pricePerHour: 25,
    image:"src/assets/rentspace_logo.svg"
  },
  {
    title: "Titulo do quarto",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 130,       
    pricePerHour: 22,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espçao bonito",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 120,       
    pricePerHour: 20,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espaço verde",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 125,       
    pricePerHour: 40,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espaço amarelo",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 125,       
    pricePerHour: 35,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espaço azul",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 192,       
    pricePerHour: 30,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espaço vermelho",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 124,       
    pricePerHour: 29,
    image:"src/assets/rentspace_logo.svg"
  } ,
  {
    title: "Espaço preto",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 173,       
    pricePerHour: 25,
    image:"src/assets/rentspace_logo.svg"

  } ,
  {
    title: "Espaço cinza",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 163,       
    pricePerHour: 60,
    image:"src/assets/rentspace_logo.svg"

  } ,

  {
    title: "Espaço",
    description: "Uma descrição. Sim, isso e´sim uma descrição. Uma descrição mockada e se a descrição for maior? Como iremos ficar? sabes lá como iremos ficar cas o a descrição fique mjuito grande. É uma ótima perguna a se",
    maxPeople: 431,       
    pricePerHour: 40,
    image:"src/assets/rentspace_logo.svg"

  } ,
];



export default function Spaces() {
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(mock.length/6);
  const router = useRouter();

  const goToPreviousPage = () => {
    if (page > 1){
      return setPage(page - 1);
    } 
  }

  const goToNextPage = () => {
    if (totalPage > page){
      return setPage(page + 1);
    }
    
  }
  const navigateToDetailsSpace = () => {
    router.push("/space/details");
  };

  const navigateToNewSpace = () => {
    router.push("/space/new");
  };

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const startIndex = (page - 1) * 6;
  const endIndex = startIndex + 6;
  const currentCards = mock.slice(startIndex, endIndex);
  return (
    <>
      <Header>
        <NavBar />
        <UserAvatar />
      </Header>
        
        <FloatingButton/>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>Espaços para alugar</span>
          </div>
          
          <div className={styles.listContainer}>
          
            {currentCards.map((card,i)=>{
            return (
              <div className={styles.card} key={i}>
                <CardDescription 
                  title={card.title} 
                  maxCapacity={card.maxPeople}
                  description={card.description}
                  image={MockImage} 
                  pricePerHour={card.pricePerHour}
                  onClick={navigateToDetailsSpace}/>
              </div>
            )
          })}
          </div>
        </div>
        <div className={styles.footer}>
            <SlArrowLeft className={styles.footerArrow} onClick={goToPreviousPage}/>
            <div className={styles.footerPage}>
              { Array.from({length: totalPage}).map((_,indice) => {
                return (
                  <>
                    {
                      page == indice+1 
                      ? 
                      (<span className={styles.currentPage}>
                        {`${indice+1} `}
                      </span>)
                      :
                      (<span>
                        {`${indice+1} `}
                      </span>)
                    }                
                  </>
                )
              })}
            </div>
            <SlArrowRight className={styles.footerArrow} onClick={goToNextPage}/>
        </div>
    </>
  );
}
