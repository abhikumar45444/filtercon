import { useState } from 'react'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './components/SplashScreen'
import NavBar from './components/NavBar'
import LocalityModal from './components/LocalityModal'
import ProductDetailModal from './components/ProductDetailModal'
import HomeScreen from './screens/HomeScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import CartScreen from './screens/CartScreen'
import DiagnosticQuiz from './screens/DiagnosticQuiz'
import ConsultationScreen from './screens/ConsultationScreen'
import ProfileScreen from './screens/ProfileScreen'
import { getAssetUrl } from './utils/assets'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [cart, setCart] = useState([
    {
      id: 'fc-alkaline-ro',
      name: 'Alkaline RO Drinking Top',
      category: 'under-sink',
      tagline: 'Under-Sink 8.5+ pH Crisp Pure Water',
      price: 499,
      qty: 1,
      image: getAssetUrl('/ro-system.jpg'),
    },
  ])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showConsultation, setShowConsultation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('San Diego (Downtown)')
  const [showLocationModal, setShowLocationModal] = useState(false)

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id)
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  if (!splashDone) {
    return (
      <PhoneShell>
        <SplashScreen onDone={() => setSplashDone(true)} />
      </PhoneShell>
    )
  }

  if (showConsultation) {
    return (
      <PhoneShell>
        <ConsultationScreen onBack={() => setShowConsultation(false)} />
      </PhoneShell>
    )
  }

  const isModalOpen = !!selectedProduct || showLocationModal

  return (
    <PhoneShell isLocked={isModalOpen}>
      <div className="flex flex-col flex-1 relative h-full">
        <div
          className={`flex-1 ${
            isModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
          } no-scrollbar scrollbar-hide pb-2`}
        >
          {activeTab === 'home' && (
            <HomeScreen
              onOpenShop={() => setActiveTab('categories')}
              onOpenDiagnostic={() => setActiveTab('diagnostic')}
              onOpenConsultation={() => setShowConsultation(true)}
              onSelectProduct={setSelectedProduct}
              selectedLocation={selectedLocation}
              onOpenLocation={() => setShowLocationModal(true)}
              onOpenCart={() => setActiveTab('cart')}
              cartCount={cartCount}
            />
          )}

          {(activeTab === 'categories' || activeTab === 'shop') && (
            <CategoriesScreen
              onSelectProduct={setSelectedProduct}
              onAddToCart={addToCart}
              onOpenDiagnostic={() => setActiveTab('diagnostic')}
            />
          )}

          {activeTab === 'cart' && (
            <CartScreen
              cart={cart}
              onClearAll={() => setCart([])}
              onRemove={removeFromCart}
              onUpdateQty={updateQty}
              onExplore={() => setActiveTab('categories')}
            />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticQuiz
              onBack={() => setActiveTab('home')}
              onSelectProduct={(p) => {
                setActiveTab('categories')
                setSelectedProduct(p)
              }}
            />
          )}

          {(activeTab === 'profile' || activeTab === 'account') && (
            <ProfileScreen
              onOpenConsultation={() => setShowConsultation(true)}
            />
          )}
        </div>

        <NavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cartCount={cartCount}
        />
      </div>

      <ProductDetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenConsultation={() => {
          setSelectedProduct(null)
          setShowConsultation(true)
        }}
        onAddToCart={addToCart}
      />

      <LocalityModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        selectedLocality={selectedLocation}
        onSelectLocality={setSelectedLocation}
      />
    </PhoneShell>
  )
}
