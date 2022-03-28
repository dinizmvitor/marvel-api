import './index.css'
import { useState, useEffect, ChangeEvent } from "react"
import { Link } from "react-router-dom";
import { api } from "../../services/api"
import { Search } from '../../components/Search';

type Characters = {
    id: number;
    name: string;
    thumbnail: {
        extension: string;
        path: string;
    };
}

export const Characters = () => {
    const [characters, setCharacters] = useState<Characters[]>([])
    const [data, setData] = useState<Characters[]>([])
    const [loading, setLoading] = useState(false)

    const offset = data.length

    useEffect(() => {
        api.get(`/characters?offset=${offset}`)
            .then((response) => {
                let total = response.data.data.total

                if (characters.length < total)
                    setCharacters(characters.concat(response.data.data.results))
            })
            .catch(err => console.log(err))
    }, [characters])

    useEffect(() => {
        api.get('/characters')
            .then((response) => {
                setData(response.data.data.results)
                console.log(response.data.data.total)
            })
            .catch(err => console.log(err))
    }, [])

    const handleLoadButton = () => {
        console.log(characters.length)
    }

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        let event = e.target.value
        let filter = characters.filter(item => item.name.toLocaleLowerCase().replaceAll(' ', '') == event.toLowerCase().replaceAll(' ', ''))

        if (filter.length > 0) {
            setData(filter)
        } else {
            setData(characters)
        }
    }

    return (
        <>
            <button onClick={handleLoadButton}>Carregar</button>
            <input type="search" onChange={handleSearchInput} />

            {data.map((character, index) => (
                <Link key={index} to={`/characters/${character.id}`}>
                    <div className="characters--container">
                        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                        <p>{character.name}</p >
                    </div>
                </Link>
            ))}
        </>
    )
}