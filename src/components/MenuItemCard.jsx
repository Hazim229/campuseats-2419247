
function MenuItemCard({ item, onAdd, onViewItem }) {
  function handleCardClick() {
    if (onViewItem) {
      onViewItem(item);
    }
  }

  return (
    <article
      className="card menu-card"
      onClick={handleCardClick}
    >
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className="btn"
        disabled={!item.available}
        onClick={(event) => {
          event.stopPropagation();
          onAdd(item);
        }}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </article>
  );
}

export default MenuItemCard;
