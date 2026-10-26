import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";
import CartPage from "./components/CartPage.jsx";

function App() {
  // Fetched data: one piece of state for each situation
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // bump it to fetch again

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]); // lines of { item, qty }
  const [view, setView] = useState("menu"); // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  );
  
function handleAddToCart(item) {
  setCart((prev) => {
    const existing = prev.find((line) => line.item.id === item.id);

    if (existing) {
      return prev.map((line) =>
        line.item.id === item.id
          ? { ...line, qty: line.qty + 1 }
          : line
      );
    }

    return [{ item, qty: 1 }, ...prev];
  });
}

function handleChangeQty(itemId, delta) {
  setCart((prev) =>
    prev
      .map((line) =>
        line.item.id === itemId
          ? { ...line, qty: line.qty + delta }
          : line
      )
      .filter((line) => line.qty > 0)
  );
}

function handleRemove(itemId) {
  setCart((prev) =>
    prev.filter((line) => line.item.id !== itemId)
  );
}

function handlePlaceOrder(details) {
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  );

  setLastOrder({ ...details, total });
  setCart([]);
  setView("done");
}

function handleViewItem(item) {
  setRecentlyViewed((prev) => [
    item,
    ...prev.filter((recent) => recent.id !== item.id),
  ].slice(0, 5));
}

function handleClearRecentlyViewed() {
  setRecentlyViewed([]);
}


  // Fetch vendors from the mock API
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setSelectedVendorId((current) => current ?? data[0]?.id ?? null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  }


  return (
    <>
      <Header 
      cartCount={cart.reduce((sum, line) => sum + line.qty, 0)}
      onShowMenu={() => setView("menu")}
      onShowCart={() => setView("cart")}
      />

      <main className="container">
        {view === "cart" ? (
    <CartPage
      cart={cart}
      onChangeQty={handleChangeQty}
      onRemove={handleRemove}
      onPlaceOrder={handlePlaceOrder}
    />
  ) : view === "done" ? (
    <section className="card">
      <h2>Order placed</h2>
      {lastOrder && (
        <p>
          Thank you, {lastOrder.name}. Pick up at {lastOrder.pickupTime}
          (Mahallah {lastOrder.mahallah}). Total RM{" "}
          {lastOrder.total.toFixed(2)}.
        </p>
      )}
      <button className="btn" onClick={() => setView("menu")}>
        Back to menus
      </button>
    </section>
  ) : (
    <>
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={vendor.id === selectedVendorId}
              onSelect={setSelectedVendorId}
            />
          ))}
        </div>
      </section>

      {selectedVendor && (
        <section>
          <h2 className="section-title">
            Menu: {selectedVendor.name}
          </h2>
          <MenuList
           items={selectedVendor.menu}
            onAdd={handleAddToCart}
             onViewItem={handleViewItem}
          />
          
<section className="card">
  <h3>Recently Viewed</h3>

  {recentlyViewed.length === 0 ? (
    <p className="muted">No recently viewed items yet.</p>
  ) : (
    <>
      <ul>
        {recentlyViewed.map((item) => (
          <li key={item.id}>
            {item.name} — RM {item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn"
        onClick={handleClearRecentlyViewed}
      >
        Clear
      </button>
    </>
  )}
</section>

        </section>
      )}
    </>
  )}
      </main>

      <Footer />
    </>
  );
}

export default App;
