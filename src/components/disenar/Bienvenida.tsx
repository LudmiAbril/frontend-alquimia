import React from 'react'
interface BienvenidaProps {
    onNext : () => void;
}
const Bienvenida = ({onNext} : BienvenidaProps) => {
  return (
    <div>Bienvenida</div>
  )
}

export default Bienvenida