import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>로그인 해주세요.</p>
  }

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;