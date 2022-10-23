import Dashboard from 'components/Dashboard';
import ProjectsPage from 'components/ProjectsPage';
import { useAuth } from 'hooks';
import { USER_TYPES } from 'utils/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const Page = user?.userType === USER_TYPES.ORG ? ProjectsPage : Dashboard;

  return <Page />;
}
