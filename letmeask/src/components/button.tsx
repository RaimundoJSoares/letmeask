import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Buttonprops) { //todas as propriedades enviadas a um componente, são enviadas como argumento da função
//  let counter = 0
//criaremos sempre o estado como CONST, por mais que seu valor seja alterado
  return (
    //sempre que for usar JS dentro do JSX, usar chave
    <button className="button" {...props} />
  )
}

//named export