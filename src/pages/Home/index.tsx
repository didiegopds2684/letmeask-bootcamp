import {useHistory} from "react-router-dom";
import {FormEvent, useState} from "react";

import illustrationImg from "../../assets/images/illustration.svg"
import logo from "../../assets/images/logo.svg"
import googleIcon from "../../assets/images/google-icon.svg"

import "../../styles/auth.scss";

import {Button} from "../../components/Button";
import {useAuth} from "../../hooks/useAuth";
import {database} from "../../services/firebase";


export function Home() {

    const history = useHistory();
    const {signInWithGoogle, user} = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if (roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()){
            alert('A sala não existe.');
            return;
        }

        if (roomRef.val().endedAt){
            alert('A sala está fechada.');
            return
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração"/>
                <strong>Crie salas de Q&A ao- vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="LetmeAsk"/>
                    <button onClick={handleCreateRoom} type="submit" className="create-room">
                        <img src={googleIcon} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        Ou entre em suma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

 