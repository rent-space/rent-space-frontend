import { NameInput } from "@/components/NameInput";
import { BiSearch } from "react-icons/bi";
import { AiFillMail } from 'react-icons/ai'

export default function Home() {
  return (
    <>
    <h1>RentSpace</h1>
    <NameInput title="Email" placeholder="exemplo@gmail.com" />
    <NameInput title="Email" placeholder="exemplo@gmail.com" icon={BiSearch}/>
    <NameInput title="Email" placeholder="exemplo@gmail.com" icon={AiFillMail}/>
    </>
  )
}
