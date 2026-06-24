import { Link, useParams, useSearchParams } from "react-router-dom";
import RealTemplateExperience from "../components/RealTemplateExperience";

export default function MomentView() {
  const { slug, code } = useParams();
  const [searchParams] = useSearchParams();

  const receiverName =
    searchParams.get("to") ||
    searchParams.get("receiver") ||
    searchParams.get("guest") ||
    searchParams.get("name") ||
    "";

  return (
    <div className="relative">
      <div className="fixed left-3 top-3 z-50 rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-primary shadow-ambient backdrop-blur">
        Demo moment • <Link to="/templates" className="underline">Templates</Link>
      </div>
      <RealTemplateExperience
        slug={slug || "birthday-treasure-box"}
        mode="full"
        receiverName={receiverName}
        momentCode={code}
      />
    </div>
  );
}
