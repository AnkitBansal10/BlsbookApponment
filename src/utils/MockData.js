import { TravelInsurance,Scooter,CourierServices,Message,PremiumLounge,ProfileIconBox, ClanderIcon1, ClanderIcon2, Holidays, WeeklyIcon } from './Image';

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
    image: require('../assets/images/abu-dhabi.png'),
  },
   {
    id: '3',
    name: 'Cameroon',
    location: 'Darma, Kuning',
    rating: 4.5,
    users: 30,
    image: require('../assets/images/cameroon.png'),
  },
   {
    id: '4',
    name: 'Senegal',
    location: 'Darma, Kuning',
    rating: 4.5,
    users: 30,
    image: require('../assets/images/dakar-senegal.png'),
  },
   {
    id: '5',
    name: 'Singapore',
    location: 'Darma, Kuning',
    rating: 4.5,
    users: 30,
    image: require('../assets/images/singapore.jpg'),
  }, {
    id: '6',
    name: 'Mali',
    location: 'Darma, Kuning',
    rating: 4.5,
    users: 30,
    image: require('../assets/images/mali.jpg'),
  },
];
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
export const boxData = [
  {
    id: '1',
    text: 'Appointment Available',
    IconComponent: ProfileIconBox,
    backgroundColor: '#5cb85c',
    span: 1, // Indicates it takes 1 column (half width)
  },
  {
    id: '2',
    text: 'Appointment Booked',
    IconComponent: ClanderIcon1,
    backgroundColor: '#d9534f',
    span: 1,
  },
  {
    id: '3',
    text: 'Currently Selected Day',
    IconComponent: ClanderIcon2,
    backgroundColor: '#337ab7',
    span: 1,
  },
  {
    id: '4',
    text: 'Weekly Off Day',
    IconComponent: WeeklyIcon,
    backgroundColor: '#6c757d',
    span: 1,
  },
  {
    id: '5',
    text: 'Holiday',
    IconComponent: Holidays,
    backgroundColor: '#f0ad4e',
    span: 2,
  },
];
  export const emojiData = [
    { 
      id: 'dissatisfied', 
      icon: 'emoticon-angry-outline',
      label: 'Dissatisfied',
      color: '#ff3d00'
    },
    { 
      id: 'sad', 
      icon: 'emoticon-sad-outline',
      label: 'Sad',
      color: '#ff9100'
    },
    { 
      id: 'neutral', 
      icon: 'emoticon-neutral-outline',
      label: 'Neutral',
      color: '#ffc400'
    },
    { 
      id: 'happy', 
      icon: 'emoticon-happy-outline',
      label: 'Happy',
      color: '#64dd17'
    },
    { 
      id: 'satisfied', 
      icon: 'emoticon-excited-outline',
      label: 'Satisfied',
      color: '#00c853'
    },
  ];