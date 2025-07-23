import React from 'react'

const Landing = () => {
  return (
    <div>
        <div className='mt-2'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
                <div className='flex justify-center items-center'>
                    <img className='max-w-96' src="/chessboard.jpeg" alt="" />
                </div>
                <div>
                    <h1 className='text-4xl font-bold'>Welcome to the Chess Game</h1>
                    <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>Start Game</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing