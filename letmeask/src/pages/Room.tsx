import { FormEvent, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import { Button } from '../components/button';
import { RoomCode } from "../components/RoomCode";
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';


type FireBaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighLighted:boolean;

}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighLighted:boolean;
}

type RoomParams = {
  id: string ;
}

export function Room(){
  const {user} = useAuth();
  const params = useParams<RoomParams>(); //generic, parametro para typagem
  const [newQuestion, setNewQuestion] = useState ('');
  const[questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('');

  const roomid = params.id!;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomid}`);

    roomRef.on('value', room =>{
      const databaseRoom = room.val();
      const fireBaseQuestions : FireBaseQuestions = databaseRoom.questions  ?? {};

      const parsedQuestions = Object.entries(fireBaseQuestions).map(([key, value]) =>{
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      }) // retorna array de chave, valor

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions)
    })
  }, [roomid]); //se houver navegação para outra sala, os dados serão carregados corretamente

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
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
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
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}