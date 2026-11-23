# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- What I asked for: None
- What I kept, changed or rejected, and why: None
- One thing the AI got wrong and how I fixed it: None

## Week 2
- Tool(s):
- What I asked for: None
- What I kept, changed or rejected, and why: None
- One thing the AI got wrong and how I fixed it: None

 ## Week 3
- Tools used: ChatGPT, Visual Studio Code.
- What I asked: I used AI for help implementing the Week 3 CampusEats features, including fetching vendor data from vendors.json, cart quantity management, checkout form validation, and merging vendor data from         classmates.
- What I kept or changed: I used the guidance for the React state, cart handlers, checkout validation, and vendor ID formatting. I reviewed and adjusted the JSON structure to ensure the vendors were inside one array    and that vendor and menu item IDs were unique.
- One thing the AI got wrong: An earlier merged JSON example had two separate top-level arrays instead of one valid JSON array. I corrected the structure and checked that the final JSON was valid.

## Week 4

- Tools used: ChatGPT, Visual Studio Code.
- What I asked: I used AI to help implement custom React hooks, Context API, React Router and my personal feature, Order Notes per Item.
- What I kept or changed: I used the guidance to create `useLocalStorage`, `useVendors`, `useCart`, `CartProvider` and the routing pages. I also implemented order notes in the cart and displayed them on the Orders page.
- One thing the AI got wrong: An earlier Header implementation still used the old Week 3 props, which caused the cart counter to malfunction. I corrected it by using `useCart()` and React Router's `NavLink`.

## Week 5

- Tools used: chatGPT, Visual 
- What I asked: I asked chatGPT to read and review each component of my CampusEats app after adding Firebase Authentication (AuthProvider, useAuth, ProtectedRoute, Login and Register pages), and to check my project against the Week 5 infographics and the Lab 5 checkpoint. I also asked it to fix an error in my Cart page and to list what I should test for Lab 5.
- What I kept or changed: I kept the fix for the Cart page crash. CartPage was reading `notes` from `useCart()`, but CartProvider never provided it, so the page crashed when the cart had items. The fix reads each line's note from `line.note` instead. I chose not to apply the other review suggestions yet (Google sign-in busy state, lint warnings), because Week 6 replaces `useVendors` and moves orders to Firestore.
- One thing the AI got wrong: [Write one real example in your own words. If nothing was wrong, say what you had to check yourself, e.g. I ran `npm run dev` on my own machine to confirm the fix, because Claude could not run the build in its environment.]

## Week 6

- Tools used: Claude, Visual Studio Code, Firebase console.
- What I asked: I asked Claude to build the Week 6 lab (Part B) from the lab sheet: connect Firestore, create the services layer (`services/vendors.js`, `services/orders.js`), the seed page, live reads with `onSnapshot` (`useVendors`, `useVendor`, `useMyOrders`), placing orders with `writeBatch`, changing pickup time and cancelling orders (`OrderStatus`, `OrderActions`), and my personal feature 7, Order notes per item, saved inside each order's `items` in Firestore. I also asked it to guide me through testing step by step, to save my M2 screenshots into `docs/m2/`, and to draft my Week 6 answers in REFLECTION.md and the bug log.
- What I kept or changed: I kept the code, which follows the lab sheet and finishes TODOs 1 to 5. Claude also added a check in `placeOrders` that stops cart items saved before Week 6 (which have no `vendorId`) from being sent to Firestore. I tested everything myself in the browser and the Firebase console: seeding, live price change, two orders from two vendors, live status change, change time, cancel, my notes feature after refresh and in another browser, and that a new account cannot see my orders. I reviewed the REFLECTION.md answers and edited them so they match my understanding.
- One thing the AI got wrong: None