import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="portal-layout">
      <Sidebar />
      <div className="portal-main-wrapper">
        <Header />
        <main className="portal-content-area animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
