
import {Link, useNavigate} from 'react-router-dom';
import {FormEvent, useState} from 'react'

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/button";
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function NewRoom() {
 const{ user } = useAuth()
 const [newRoom, setNewRoom] = useState('');
 const history = useNavigate()

 async function navigateToNewRoom(event:FormEvent){
  event.preventDefault();
  if(newRoom.trim()=== ''){  //trim remove espaços tanto da esquerda quanto direita
    return;
  }

  const roomRef = database.ref('rooms');

  const firebaseRoom = await roomRef.push({ //quando for salvar informação dentro de uma lista, uso push
    title: newRoom,                         //se não for lista, use .set ao invés de push
    authorId: user?.id,
  })

  history(`/rooms/${firebaseRoom.key}`)
 }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;a ao vivo!</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={navigateToNewRoom}>
            <input type="text" 
            placeholder="nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Deseja entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
