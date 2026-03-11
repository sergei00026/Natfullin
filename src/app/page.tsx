import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/dashboard/pages");
};

export default HomePage;
