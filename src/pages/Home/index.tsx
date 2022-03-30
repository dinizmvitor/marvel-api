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

    const getAllCharacters = async () => {
        let offset = characters.length
        let response =  await api.get(`characters?offset=${offset}`)
        let total = response.data.data.total

        if(characters.length < total) {
            setLoading(true)
            setCharacters(characters.concat(response.data.data.results))
            setMaxHeros(total)
        } else {
            setData(characters)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCharacters()
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
                <input type="text" placeholder="Busque por um herói" onChange={handleSearchInput}  />
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