import { useState } from 'react'
import vendors from './data/vendors.js'
import Header from './components/Header.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const selectedVendor = vendors[0]

  const [cart, setCart] = useState([])

  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item])
  }

  return (
    <>
      <Header cartCount={cart.length} />

      <main className="container">
        <h2 className="section-title">
          Menu: {selectedVendor.name}
        </h2>

        <MenuList
          items={selectedVendor.menu}
          onAdd={handleAddToCart}
        />
      </main>

      <Footer />
    </>
  )
}

export default App