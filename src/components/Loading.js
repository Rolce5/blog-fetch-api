import React from 'react'

const Loading = () => {
  return (
    <div>
      <div className='spinner-border text-primary mt-5' role='status'>
        <span className='visually-hidden'></span>
      </div><span>Loading...  Please wait.</span>
    </div>
  )
}

export default Loading
