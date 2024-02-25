// assets
import { IconDashboard } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'addWorkout',
      title: 'Add',
      type: 'item',
      url: '/dashboard/addworkout',
      icon: AddIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
