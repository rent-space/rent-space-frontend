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
import mock from './mock.js';
import MockImage from '@/assets/noImageFile.svg';

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
