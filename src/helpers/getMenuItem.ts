import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

export default getMenuItem;
