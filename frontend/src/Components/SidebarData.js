import { FaTachometerAlt, FaMapMarkerAlt, FaThList, FaUserFriends, FaCarSide, FaStar } from 'react-icons/fa';

const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FaTachometerAlt color="#4dabf7" />,
    textColor: '#4dabf7',
    cName: 'nav-text',
  },
  {
    title: 'Location',
    path: '/location',
    icon: <FaMapMarkerAlt color="#e03131" />,
    textColor: '#e03131',
    cName: 'nav-text',
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <FaThList color="#f08c00" />,
    textColor: '#f08c00',
    cName: 'nav-text',
  },
  {
    title: 'Passenger',
    path: '/passenger',
    icon: <FaUserFriends color="#12b886" />,
    textColor: '#12b886',
    cName: 'nav-text',
  },
  {
    title: 'Vehicle Owner',
    path: '/owner',
    icon: <FaCarSide color="#7950f2" />,
    textColor: '#7950f2',
    cName: 'nav-text',
  },
  {
    title: 'Review',
    path: '/review',
    icon: <FaStar color="#fab005" />,
    textColor: '#fab005',
    cName: 'nav-text',
  },
];

export default SidebarData;
