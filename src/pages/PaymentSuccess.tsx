import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
export default function PaymentSuccess() {
  return (
    <Layout>
      <section className="mesh py-24 text-center">
        <div className="container-pad">
          <CheckCircle size={72} className="mx-auto text-primary" />
          <h1 className="serif mt-6 text-5xl font-bold">
            Your Moment is live.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Share this link with anyone. In production this will be generated
            uniquely after payment.
          </p>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-4 shadow-ambient">
            https://createyourmoments.com/m/demo
          </div>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/m/demo" className="btn-primary px-8 py-4">
              Open Moment
            </Link>
            <Link to="/dashboard" className="btn-soft px-8 py-4">
              Go Dashboard
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
