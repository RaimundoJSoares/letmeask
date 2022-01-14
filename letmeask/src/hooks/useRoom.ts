import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FireBaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighLighted:boolean;
  likes: Record<string, {
    authorId:string; 
  }>

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
  likeCount: number;
  likeId:string | undefined;
}

export function useRoom (roomid: string) {
  const { user } = useAuth();
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
          likeCount:Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find( ([key , like]) => like.authorId === user?.id)?.[0],
        }
      }) // retorna array de chave, valor

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value');
    }
  }, [roomid, user?.id]); //se houver navegação para outra sala, os dados serão carregados corretamente

  return{questions, title};
}