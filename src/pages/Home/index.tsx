import './index.scss'
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

export const Home = () => {
    const [characters, setCharacters] = useState<Characters[]>([])
    const [data, setData] = useState<Characters[]>([])
    const [maxHeros, setMaxHeros] = useState(0)
    const [loading, setLoading] = useState(false)

    const getAllCharacters = () => {
        let offset = characters.length

        api.get(`/characters?offset=${offset}`)
            .then((response) => {
                let results = response.data.data.results

                setCharacters(characters.concat(results))
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        api.get('/characters')
            .then((response) => {
                let total = response.data.data.total
                setMaxHeros(total)

                if (characters.length < maxHeros) {
                    setLoading(true)
                    getAllCharacters()
                } else {
                    setLoading(false)
                    setData(data.concat(characters))
                }
            })
            .catch((err) => console.log(err))
    }, [characters])

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        let event = e.target.value
        let filter = characters.filter(item => item.name.toLocaleLowerCase().includes(event))

        if (filter.length > 0) {
            setData(filter)
        } else {
            setData(characters)
        }
    }

    return (
        <div className="main">
            <div className="search--input">
                <input type="search" onChange={handleSearchInput} />
            </div>

            {loading &&
                <div className="load">
                    <h2>Carregando {characters.length}/{maxHeros} heróis... Aguarde!</h2>
                </div>
            }

            {!loading &&
                <div className="container">
                    {data.map((item: Characters, index: number) => (
                        <Link key={index} to={`/${item.id}`} target="_blank">
                            <div className="card">
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