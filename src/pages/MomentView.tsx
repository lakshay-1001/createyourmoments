import { Link, useParams } from "react-router-dom";
import RealTemplateExperience from "../components/RealTemplateExperience";

export default function MomentView() {
  const { slug } = useParams();
  return (
    <div className="relative">
      <div className="fixed left-4 top-4 z-50 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-primary shadow-ambient backdrop-blur">
        Demo moment • <Link to="/templates" className="underline">Templates</Link>
      </div>
      <RealTemplateExperience slug={slug || "birthday-treasure-box"} mode="full" />
    </div>
  );
}
