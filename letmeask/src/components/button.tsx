import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({isOutlined = false, ...props}: Buttonprops) { //todas as propriedades enviadas a um componente, são enviadas como argumento da função
//  let counter = 0
//criaremos sempre o estado como CONST, por mais que seu valor seja alterado
  return (
    //sempre que for usar JS dentro do JSX, usar chave
    <button className={`button ${isOutlined ? 'outlined' : ''}`} //if else, caso exista coloca outlined, se não é vazio
    {...props} />
  )
}

//named export