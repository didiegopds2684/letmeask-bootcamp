import copyImg from "../../assets/images/copy.svg";

import './styles.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipCoard(){
        navigator.clipboard.writeText(props.code)
    }
    return(
        <button className="room-code" onClick={copyRoomCodeToClipCoard}>
            <div>
                <img src={copyImg} alt="Copiar"/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}