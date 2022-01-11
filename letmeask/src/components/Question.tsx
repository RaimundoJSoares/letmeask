import '../styles/question.scss'

type Questionprops = {
  content: string;
  author: {
    name:string;
    avatar:string;
  }
}

export function Question({   //se pode usar tambem props:questionprops, mas dai mudaria o p para props.content
  content,
  author,
}: Questionprops ) {
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div></div>
      </footer>
    </div>
  );
}