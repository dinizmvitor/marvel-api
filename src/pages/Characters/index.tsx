import './index.css'
import { useState, useEffect, ChangeEvent } from "react"
import { Link } from "react-router-dom";
import { api } from "../../services/api"

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

    const getAllCharacters = () => {
        let offset = characters.length

        api.get(`/characters?offset=${offset}`)
            .then(response => {
                let results = response.data.data.results

                setCharacters(characters.concat(results))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        api.get('/characters')
            .then(response => {
                let total = 10 // response.data.data.total

                console.log(characters.length < total)
                if (characters.length && data.length < total) {
                    setLoading(true)
                    getAllCharacters()
                } else {
                    setLoading(false)
                    setData(data.concat(characters))
                }
            })
    }, [characters])

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        let event = e.target.value
        let filter = characters.filter(item => item.name.toLocaleLowerCase() == event.toLowerCase())

        if (filter.length > 0) {
            setData(filter)
        } else {
            setData(characters)
        }
    }

    return (
        <div className="characters--content">

            <div className="search--input">
                <input type="search" onChange={handleSearchInput} />
            </div>

            {loading &&
                <div className="load--content">
                    <h2>Carregando {data.length} heróis... Aguarde!</h2>
                </div>
            }

            {!loading &&
                <div className="characters--container">
                    {data.map((item: Characters, index: number) => (
                        <Link key={index} to={`/characters/${item.id}`}>
                            <div className="characters--card">
                                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
                                <span>{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}