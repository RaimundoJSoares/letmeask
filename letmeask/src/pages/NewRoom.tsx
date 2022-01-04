import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/button";

import '../styles/auth.scss'

export function NewRoom() {
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
          <form>
            <input type="text" 
            placeholder="nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Deseja entrar em uma sala existente? <a href="https://www.youtube.com/watch?v=MLGVvZWWQsk">Clique Aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
}
