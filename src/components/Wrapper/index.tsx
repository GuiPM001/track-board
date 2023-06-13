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
      {children}
    </div>
  )
}

export default Wrapper;