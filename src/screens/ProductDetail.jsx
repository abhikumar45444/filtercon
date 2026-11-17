import ProductDetailModal from '../components/ProductDetailModal'

export default function ProductDetail({ product, onBack, onAddToCart, onOpenConsultation }) {
  return (
    <ProductDetailModal
      isOpen={!!product}
      product={product}
      onClose={onBack}
      onAddToCart={onAddToCart}
      onOpenConsultation={onOpenConsultation}
    />
  )
}
