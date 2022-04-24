import {useParams} from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import {Button} from "../components/Button";

import '../styles/room.scss';
import {RoomCode} from "../components/RoomCode";
import {useState} from "react";

type RoomsParams = {
    id: string;
}

export function Room() {

    const params = useParams<RoomsParams>();

    const [newQuestion, setNewQuestion] = useState('');

    const roomId = params.id;

    async function handleSendQuestion(){
        if (newQuestion.trim() === ''){
            return;
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo do sistema"/>
                    <RoomCode code={params.id}/>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>
                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}