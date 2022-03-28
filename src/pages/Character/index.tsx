import './index.css'
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
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
            .then(response => {
                setCharacter(response.data.data.results)
                console.log(response.data.data)
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <>
            {character.map((character) => (
                <div className="character--container">
                    <div className="character--img">
                        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                    </div>
                    <div className="character--description">
                        <h2>Name:</h2>
                        <span className="character--text">{character.name}</span>
                        <h2>Description:</h2>
                        <span className="character--text">{character.description ? character.description : '404 - Not Found!'}</span>
                    </div>
                </div>
            ))}
        </>
    )
}