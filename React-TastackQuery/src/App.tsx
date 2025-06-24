import  { Suspense } from 'react';
import Loaders from './components/Loaders';
import User from './components/Users';


function App() {
  

  return (
    <div className="min-h-screen bg-gray-50 place-content-center">
      <Suspense fallback={<Loaders />}>
        <User />
      </Suspense>
      </div>
  )
}

export default App
