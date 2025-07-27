import React from 'react'

const Button = ({onClick,children}:{onClick:()=>void,children:React.ReactNode} )=> {
  return (
        <button onClick={onClick} className='px-8 py-4 bg-green-500 hover:bg-green-800 text-white rounded'>
            {children}
        </button>
  )
}

export default Button