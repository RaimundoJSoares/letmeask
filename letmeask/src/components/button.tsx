import { useState } from "react";

export function OutlineButton() { //todas as propriedades enviadas a um componente, são enviadas como argumento da função
//  let counter = 0
//criaremos sempre o estado como CONST, por mais que seu valor seja alterado
const [counter, setCounter] = useState(0) //passo o parametro para qual numero quero iniciar o counter

  function increment(){
    setCounter(counter +1);
    console.log(counter);
  }
  return (
    //sempre que for usar JS dentro do JSX, usar chave
    <button onClick={increment}>
      {counter}
      </button>
  )
}

//named export