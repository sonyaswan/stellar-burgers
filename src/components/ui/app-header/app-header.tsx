//шапка приложения

import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { useLocation, NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { appPath } from '@utils-types';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();

  const linkActiveClass = (state: { isActive: boolean }) =>
    state.isActive ? clsx(styles.link_active, styles.link) : clsx(styles.link);

  const iconType = (state: string) =>
    state === pathname ? 'primary' : 'secondary';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink to={appPath.main} className={linkActiveClass}>
              <BurgerIcon type={iconType(appPath.main)} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink to={appPath.feed} className={linkActiveClass}>
              <ListIcon type={iconType(appPath.feed)} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <NavLink to={appPath.main}>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <NavLink to={appPath.profile} className={linkActiveClass}>
            <ProfileIcon type={iconType(appPath.profile)} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
