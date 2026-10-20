import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-page rounded-[2.5rem] bg-white p-12 text-center shadow-soft">
        <p className="font-display text-6xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">This route does not exist in the UnityAid build.</p>
        <Link to="/" className="btn-primary mt-8">Back Home</Link>
      </div>
    </section>
  );
}
