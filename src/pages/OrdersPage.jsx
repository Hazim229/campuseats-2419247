import { useMyOrders } from '../hooks/useMyOrders.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Orders</h2>
        <p className="muted">You haven't placed any orders yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <p className="muted">Status updates appear here live.</p>

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">{order.vendorName} · pickup {order.pickupTime}</p>
            <ul className="order-items">
              {order.items.map((i) => (
                <li key={i.itemId} className="muted">
                  {i.qty}× {i.name}
                  {/* Personal feature (#7): note read from the order document in Firestore */}
                  {i.note && <span className="order-note"> — Note: {i.note}</span>}
                </li>
              ))}
            </ul>
            <p className="muted">Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}</p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage
