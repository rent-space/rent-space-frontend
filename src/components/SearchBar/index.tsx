import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    search: string,
    onSearchInputChanged: ()=>void
}

export function SearchBar({...props}: SearchBarProps) {
    return (
        <div className={styles.containerSearch}>
            <FaSearch className={styles.icon}/>
            <input value={props.search} onChange={props.onSearchInputChanged} 
                className={styles.input} 
                type="text" placeholder="Buscar Participante..."  />
        </div>
    )
}