# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
plain DOM code: guide the computer step-bystep on how to modify the page
React: tells react directly on how the page should looks like

3. Why must a component name start with a capital letter?
   thats how it was designed, and lower case is used for element like <button> instead

4. What does a fragment <>...</> do, and why not just use a <div>?
   group element together, cuz <div> will be added to actual page...might effect the codes

5. Name one benefit of splitting the UI into small components.
 Making it easier to iterate

# Week 6 reflection

1. What happens from the moment I click Place order until the new order appears on my Orders page?
First, `handleSubmit` in `CheckoutForm` runs `validate()`. If the form is fine, it calls `onPlaceOrder`, which is `handlePlaceOrder` in `CartPage`. That function runs `await placeOrders(user, cart, details)` from `services/orders.js`. Inside `placeOrders`, my cart gets grouped by `vendorId`, and `writeBatch` adds one order per shop with `batch.set()`. Every order starts as `status: 'Received'` with `createdAt: serverTimestamp()`, and `batch.commit()` saves them together. After that, `CartPage` calls `clearCart()` and `navigate('/orders')`. The Orders page uses `useMyOrders`, which calls `subscribeToMyOrders`. That has an `onSnapshot` listener, so the new orders just appear. I don't call `setOrders` myself because the listener already sends every Firestore change to the page, even a status change I make in the console.

2. Why is `orders` a top-level collection, and why does each order copy `vendorName` and each item's name and price instead of storing only IDs?
With `orders` at the top level, one query (`where('studentUid', '==', uid)`) gets all my orders from every vendor. If orders were inside each vendor, I would need a separate query for each shop. The order copies `vendorName` and each item's name and price so it remembers what I bought at that moment. If the shop changes a price later, my old order should still show what I paid. I saw this in my test: my Nasi Ayam Gepuk order kept price 9 after the menu went back to 8. Firestore has no joins either, so storing only IDs would mean extra reads every time the Orders page loads.

3. My personal feature (7: Order notes per item): which Firestore path and fields hold its data, and which line of my code reads it?
The note lives in the order document at `orders/{orderId}`, inside the `items` array, as the `note` field of each item (`items[].note`). It gets written in `services/orders.js` when the order is placed, with `note: note ?? ''`. That way an item without a note gets an empty string instead of `undefined`. The note itself comes from the cart line, where `CartProvider` keeps each signed-in user's notes. On the Orders page, this line in `src/pages/OrdersPage.jsx` reads it:
`{i.note && <span className="order-note"> — Note: {i.note}</span>}`
Since the page uses `onSnapshot`, changing a note in the Firestore console updates the page without a refresh.

## Bug log (M2 section 4.3)

**Bug: Cart page crashed when the cart had items.**
- What happened: after adding per-user order notes, the Cart page broke as soon as an item was in the cart. The empty-cart message still showed, so the crash only appeared once something was added.
- Cause: `CartPage` read `notes` from `useCart()`, but `CartProvider` never included `notes` in its context value. So `notes` was `undefined`, and `notes[line.item.id]` threw "Cannot read properties of undefined".
- Fix: I read each note from the cart line instead, with `note={line.note ?? ""}`, because `CartProvider` already attaches the signed-in user's note to every line.
