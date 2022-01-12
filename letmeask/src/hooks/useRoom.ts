import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FireBaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighLighted:boolean;

}>

type Questiontype = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighLighted:boolean;
}

export function useRoom (roomid: string) {
  const[questions, setQuestions] = useState<Questiontype[]>([])
  const [title, setTitle] = useState('');
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

  return{questions, title};
}