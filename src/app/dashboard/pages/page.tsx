import { appPages } from "@/shared/config/pages";
import { PagesList } from "@/widgets/pages-list/ui/pages-list";

const PagesRoute = () => {
  return <PagesList pages={appPages} />;
};

export default PagesRoute;
