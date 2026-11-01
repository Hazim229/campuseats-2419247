import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="card">
      <h2>404 - Page Not Found</h2>

      <p className="muted">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="btn">
        Back to Vendors
      </Link>
    </section>
  );
}

export default NotFoundPage;

