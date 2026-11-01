import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Orders</h2>
        <p className="muted">
          You haven't placed any orders yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {[...orders].reverse().map((order) => (
        <div className="card" key={order.id}>
          <h3>Order #{order.id}</h3>

          <p>Name: {order.name}</p>
          <p>Pickup time: {order.pickupTime}</p>
          <p>Mahallah: {order.mahallah}</p>

          <h4>Ordered Items</h4>

          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>
                <strong>{line.item.name}</strong>
                {" × "}{line.qty}

                <p className="muted">
                  Note: {line.note || "No special instructions"}
                </p>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            Total: RM {order.total.toFixed(2)}
          </p>
        </div>
      ))}
    </section>
  );
}

export default OrdersPage;
