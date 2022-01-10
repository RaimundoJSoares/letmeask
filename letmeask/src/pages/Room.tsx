import { FormEvent, useState } from 'react';
import {useParams} from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import { Button } from '../components/button';
import { RoomCode } from "../components/RoomCode";
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string ;
}

export function Room(){
  const {user} = useAuth();
  const params = useParams<RoomParams>(); //generic, parametro para typagem
  const [newQuestion, setNewQuestion] = useState ('');

  const roomid = params.id!;

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault(); //para não recarregar a tela

    if(newQuestion.trim() === '') {
      return;
    }
    if (!user){
      throw new Error('You must logged in')
    }
    
    const question = {
      const: newQuestion,
      author: {
        name:user.name,
        avatar: user.avatar
      },
      isHighLighted: false, //se está sendo respondida atualmente
      isAnswered: false,  //se ja foi respondida ou não(começa como falso claro)
    };

    await database.ref(`rooms/${roomid}/questions`).push(question); // 0000000

    setNewQuestion(''); //vai assumir valor vazio depois que enviar a pergunta
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomid} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala react</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)} //valor do imput conforme é digitado
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (  //if else
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span> Para enviar uma pergunta, <button>faça seu login</button> </span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}