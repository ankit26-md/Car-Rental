import { FaTachometerAlt, FaCar, FaCalendarAlt, FaStar } from 'react-icons/fa';
const SidebarVO = [
  {
    title: 'Dashboard',
    path: '/main',
    icon: <FaTachometerAlt style={{ color: '#ffcc00' }} />,
    cName: 'nav-text',
    color: '#ffcc00',
  },
  {
    title: 'Post Car',
    path: '/postcar',
    icon: <FaCar style={{ color: '#00ffcc' }} />, 
    cName: 'nav-text',
    color: '#00ffcc',
  },
  {
    title: 'View Booking',
    path: '/booking',
    icon: <FaCalendarAlt style={{ color: '#ff6666' }} />, 
    cName: 'nav-text',
    color: '#ff6666',
  },
  {
    title: 'Review',
    path: '/vreview',
    icon: <FaStar style={{ color: '#ffa500' }} />, 
    cName: 'nav-text',
    color: '#ffa500',
  },
];
export default SidebarVO;