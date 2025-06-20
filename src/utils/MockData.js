import { TravelInsurance,Scooter,CourierServices,Message,PremiumLounge } from './Image';
import { scale } from './responsive';

export const visaOptions = [
   { id: '1', label: "I'm applying from", icon: 'map-marker-outline' },
  { id: '2', label: "I'm going to", icon: 'airplane' },
];

export const destinationData = [
  {
    id: '1',
    name: 'Kazakhstan',
    location: 'Tekergat, Sunamgnj',
    rating: 4.7,
    users: 50,
    image: require('../assets/images/Kazakhstan.png'),
  },
  {
    id: '2',
    name: 'Abu Dhabi',
    location: 'Darma, Kuning',
    rating: 4.5,
    users: 30,
    image: require('../assets/images/Kazakhstan.png'),
  },
];

// export const destinations = [
//   {
//     name: 'Kazakhstan',
//     location: 'Tekergat, Sunamgnj',
//     rating: 4.7,
//     image: require('../assets/kazakhstan.jpg'),
//     users: [
//       require('../assets/user1.png'),
//       require('../assets/user2.png'),
//       require('../assets/user3.png'),
//     ],
//     moreUsers: 50,
//   },
//   // Add more cards if needed...
// ];


export const data = [
    { id: '1', title: 'Tourism' },
    { id: '2', title: 'Business' },
    { id: '3', title: 'Transit' },
    { id: '4', title: 'Medical' },
];

export const Long_data = [
    { id: '1', title: 'Tourism' },
    { id: '2', title: 'Business' },
    { id: '3', title: 'Transit' },
];

export const services = [
  { id: '1', title: 'Doorstep Delivery Services', icon: <Scooter width={scale(54)} height={scale(44)} /> },
  { id: '2', title: 'Automated SMS of Visa Status',icon: <Message width={scale(54)} height={scale(44)}/> },
  { id: '3', title: 'Courier Services',icon: <CourierServices width={scale(54)} height={scale(44)}/> },
  { id: '4', title: 'Travel Insurance',icon: <TravelInsurance width={scale(54)} height={scale(44)}/> },
  { id: '5', title: 'Premium Lounge', icon: <PremiumLounge width={scale(54)} height={scale(44)}/> },
];


