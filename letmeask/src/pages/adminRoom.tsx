import {useParams} from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import { Button } from '../components/button';
import { Question } from '../components/Question';
import { RoomCode } from "../components/RoomCode";
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParams = {
  id: string ;
}

export function AdminRoom(){
 // const {user} = useAuth();
  const params = useParams<RoomParams>(); //generic, parametro para typagem
  const roomid = params.id!;
  const {title, questions,} = useRoom(roomid);
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
          <RoomCode code={roomid} />
          <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
              <div className="question-list">
              {questions.map(question => {
                return(
                  <Question
                  key={question.id}
                  content={question.content}
                  author={question.author} 
                  />
                );
              })}
              </div>
      </main>
    </div>
  );
}