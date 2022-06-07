import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const HomeInfoCardData = [
   {
      title: 'Lowest Prices Guaranteed',
      description: 'Shopcult offers the best prices available online. Our team constantly work hard for you to deliver the best value for money.',
      icon: <SettingsOutlinedIcon sx={{color: '#fff', fontSize: '2.5rem'}} />
   },
   {
      title: 'Same Day Dispatch Before 3 pm',
      description: 'Please keep in mind that if an order has different delivery timescale, the fulfillment of the order will be the oldest timescale.',
      icon: <LocalShippingOutlinedIcon sx={{color: '#fff', fontSize: '2.5rem'}} />
   },
   {
      title: 'Rearrange Delivery If Changed Mind',
      description: 'Never worry about returns. Everything we sell online is covered under Distance Selling Regulations by a 14-day cooling-off period.',
      icon: <LoopOutlinedIcon sx={{color: '#fff', fontSize: '2.5rem'}} />
   },
   {
      title: 'Established 25 Years Ago',
      description: 'In 1996 we made our final move to our current premises in the heart of New York. We are located in a point outdoor market.',
      icon: <Inventory2OutlinedIcon sx={{color: '#fff', fontSize: '2.5rem'}} />
   }
];

export default HomeInfoCardData;