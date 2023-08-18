import { useAppSelector } from '../store/hooks';

const UserTitle = () => {
  const { username } = useAppSelector((state) => state.auth);
  return username;
};

export { UserTitle };
