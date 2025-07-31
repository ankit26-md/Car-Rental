import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

const Sidemenu = [
  {
    title: 'Booking',
    path: '/carbooking',
    icon: <FaIcons.FaCar color="skyblue" />,
    cName: 'nav-text',
    textColor: 'white'
  },
  {
    title: 'History',
    path: '/history',
    icon: <IoIcons.IoMdTime color="orange" />,
    cName: 'nav-text',
    textColor: 'white'
  }
];

export default Sidemenu;
