import { Route, Routes } from 'react-router-dom'
import Main from './Components/main'
import Details from './Components/Details'
import AddProduct from './Components/AddProduct'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/details' element={<Details />} />
        <Route path='/Addproduct' element={<AddProduct />} />
      </Routes>
    </>
  )
}

export default App
