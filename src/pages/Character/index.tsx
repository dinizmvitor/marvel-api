import "./index.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { api } from "../../services/api"

export type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        extension: string;
        path: string;
    };
}

export const Character = () => {
    const [character, setCharacter] = useState<Character[]>([])
    const { id } = useParams()

    useEffect(() => {
        api.get(`/characters/${id}`)
            .then((response) => {
                setCharacter(response.data.data.results)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="main--single">
            {character.map((item, index) => (
                <div key={index} className="container--single">
                    <div className="img-box">
                        <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
                    </div>
                    <div className="container--description">
                        <h2>Name:</h2>
                        <span>{item.name}</span>
                        <h2>Description:</h2>
                        <span>{item.description ? item.description : 'Empty!'}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}