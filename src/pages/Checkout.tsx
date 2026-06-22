import Layout from "../components/Layout";
import { Link } from "react-router-dom";
export default function Checkout() {
  return (
    <Layout>
      <section className="container-pad py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_380px]">
          <div className="glass rounded-3xl p-8">
            <p className="caps text-primary">Checkout</p>
            <h1 className="serif mt-3 text-4xl font-bold">
              Confirm your moment
            </h1>
            <div className="mt-8 grid gap-4">
              <input className="field" placeholder="Full name" />
              <input className="field" placeholder="Email address" />
              <input className="field" placeholder="Phone number" />
              <textarea
                className="field min-h-28"
                placeholder="Special instructions"
              />
            </div>
            <p className="mt-5 text-sm text-muted">
              Razorpay integration will be connected here later. This page is
              ready for order creation flow.
            </p>
          </div>
          <aside className="glass h-max rounded-3xl p-8">
            <h2 className="serif text-3xl font-bold">Order Summary</h2>
            <div className="mt-6 space-y-3 text-muted">
              <div className="flex justify-between">
                <span>Premium Moment</span>
                <b>₹299</b>
              </div>
              <div className="flex justify-between">
                <span>Hosting 60 days</span>
                <b>Free</b>
              </div>
              <div className="border-t border-outline/40 pt-4 flex justify-between text-text">
                <span>Total</span>
                <b className="text-2xl">₹299</b>
              </div>
            </div>
            <Link
              to="/success"
              className="btn-primary mt-8 block py-4 text-center"
            >
              Pay with Razorpay Later
            </Link>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
