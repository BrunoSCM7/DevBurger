import { Button } from "../Button"
import { Container } from "./styles"

import { toast, Zoom } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(500)
  const navigate = useNavigate()

  const { cartProducts, clearCart } = useCart();

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc
    }, 0)

    setFinalPrice(sumAllItems)
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity, price: product.price }
    });

    try {
      const { data } = await api.post('/create-payment-intent', { products });

      navigate('/checkout', {
        state: data,
      })
    } catch (err) {
      toast.error('Erro! Tente Novamente 😳', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }


  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do Pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de Entrega </p>
          <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  )
}