import { NavLink } from "react-router";

function CartItem({
  line,
  note = "",
  isAuthenticated,
  onChangeQty,
  onRemove,
  onUpdateNote,
}) {
  const { item, qty } = line;
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>

        <p className="muted">
          RM {item.price.toFixed(2)} each
        </p>

        {isAuthenticated ? (
          <label>
            Order note:
            <input
              type="text"
              placeholder="e.g. Less sugar, no ice..."
              value={note}
              onChange={(e) =>
                onUpdateNote(item.id, e.target.value)
              }
            />
          </label>
        ) : (
          <p className="muted">
            <NavLink to="/login">
              Log in to add notes
            </NavLink>
          </p>
        )}
      </div>

      <div className="qty">
        <button
          type="button"
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>

        <span>{qty}</span>

        <button
          type="button"
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>
      </div>

      <p className="line-total">
        RM {(item.price * qty).toFixed(2)}
      </p>

      <button
        type="button"
        className="link danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  );
}
export default CartItem;