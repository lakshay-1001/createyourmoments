import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplatePreview from "./pages/TemplatePreview";
import CreateMoment from "./pages/CreateMoment";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MomentView from "./pages/MomentView";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/templates/:slug" element={<TemplatePreview />} />
      <Route path="/create" element={<CreateMoment />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/m/demo" element={<MomentView />} />
      <Route path="/m/:slug" element={<MomentView />} />
      <Route path="/celebrate/:slug" element={<MomentView />} />
      <Route path="/invite/:code/:slug" element={<MomentView />} />
      <Route path="/:code/:slug" element={<MomentView />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Legal type="privacy" />} />
      <Route path="/terms" element={<Legal type="terms" />} />
      <Route path="/copyright" element={<Legal type="copyright" />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
