import vladimir from '../assets/vladimir.jpg';
import alexey from '../assets/alexey.jpg';
import andrey from '../assets/andrey.jpg';
export const TEAM_INFO =
  'We are looking for new technologies and ready to use them on the go in our projects. We used workload segregation by tasks instead of segregation by areas therefore everyone made his own income to every feature in this project. We are ready to help each other on demand. We can spread out to investigate as much as possible and get together to share our knowledge.';

export const DEVELOPERS_INFO = [
  {
    name: 'Alexey Filipovich',
    text: `Born in 1998. After graduating from school, studied at BSEU for 1.5 years. Currently working as MS SQL database support at SolbegSoft. Going to become a frontend engineer.`,
    portrait: alexey,
    role: 'Team Lead Frontend Developer',
    githubLink: 'https://github.com/terrign',
    age: '25 years',
    location: 'Minsk',
    education: 'BSEU 1.5 years',
    job: 'MS SQL database support at SolbegSoft',
    details: 'Going to become a frontend engineer',
    contribution: 'Login, Registration, Cart, User',
  },
  {
    name: 'Andrei Zetsmanis',
    text: TEAM_INFO,
    portrait: andrey,
    role: 'Frontend Developer',
    githubLink: 'https://github.com/anderskambenders',
    age: '30 years',
    location: 'Minsk',
    education: 'VSTU Economic degree',
    job: '-',
    details: 'Going to become a frontend engineer',
    contribution: 'Home, Catalog',
  },
  {
    name: 'Vladimir Kirpichyov',
    text: `Born in 1983. VSU Applied Math and Computer Science degree. Fullstack Openedge Progress 4GL developer for 15 years in Coins ltd.`,
    portrait: vladimir,
    role: 'Frontend Developer',
    githubLink: 'https://github.com/vladimirtrainee',
    age: '40 years',
    location: 'Vitebsk',
    education: 'VSU Applied Math and Computer Science degree',
    job: 'Fullstack Openedge Progress 4GL developer for 15 years in Coins ltd',
    details: 'Check myself as a Javascript Frontend Developer',
    contribution: 'Product, About Us',
  },
];
