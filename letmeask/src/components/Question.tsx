import {ReactNode} from 'react'

import '../styles/question.scss'

type Questionprops = {
  content: string;
  author: {
    name:string;
    avatar:string;
  };
  children?: ReactNode // ractnode é qualquer coisa que é aceitavel dentro de um return
}

export function Question({   //se pode usar tambem props:questionprops, mas dai mudaria o p para props.content
  content,
  author,
  children,
}: Questionprops ) {
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}