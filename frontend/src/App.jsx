import { useState } from 'react';
import Left from './home/leftpart/Left'
import Right from './home/rightpart/Right'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='flex flex-row h-screen'>
   <Left/>
   <Right/>
    </div>
  )
}

export default App
