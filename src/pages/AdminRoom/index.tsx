import {useHistory, useParams} from "react-router-dom";
// import {useState} from "react";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import '../Room/styles.scss';

import {Button} from "../../components/Button";
import {RoomCode} from "../../components/RoomCode";
import {Question} from "../../components/Question";

// import {useAuth} from "../../hooks/useAuth";
import {useRoom} from "../../hooks/useRoom";
import {database} from "../../services/firebase";


type RoomsParams = {
    id: string;
}

export function AdminRoom() {


    // const {user} = useAuth();
    const history = useHistory();
    const params = useParams<RoomsParams>();
    const roomId = params.id;
    const {title,questions} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        if (window.confirm('Tem certeza que você deseja excluir está pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo do sistema"/>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                {questions.map(question => {
                    return(
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta"/>
                            </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}