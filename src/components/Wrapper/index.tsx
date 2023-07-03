import React, { ReactNode } from 'react';
import './style.scss';

interface WrapperProps {
  title: string,
  children: ReactNode
}

function Wrapper(props: WrapperProps) {
  const { title, children } = props;

  return (
    <div className='wrapper'>
      <h1 className='title'>{title}</h1>
      
      {/* TODO: adicionar componente de loading aqui, pra não precisar
      colocar o loading em todas as paginas */}
      <div className='children'>
        {children}
      </div>
    </div>
  )
}

export default Wrapper;