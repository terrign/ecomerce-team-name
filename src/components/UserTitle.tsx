import { useAppSelector } from '../store/hooks';

const UserTitle = () => {
  const username = useAppSelector((state) => state.auth.username);
  return username;
};

export default UserTitle;
