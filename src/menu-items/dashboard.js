// assets
import { IconDashboard, IconUsers } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
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
            id: 'users',
            title: 'Add User',
            type: 'item',
            url: '/dashboard/user',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'project',
            title: 'Add Project',
            type: 'item',
            url: '/dashboard/project',
            icon: icons.IconUsers,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
