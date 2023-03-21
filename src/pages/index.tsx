<<<<<<< HEAD
import { Header } from '@/components/header';
import { LeftMenu } from '@/components/left_menu';
import { MainArea } from '@/components/main_area';
import { TerminalArea } from '@/components/terminal_area';
import { message } from 'antd';
import React from 'react';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';

const APP = () => {
  return (
    <div className="h-screen">
      <Header/>
      <div className="w-screen h-full pt-16 flex">
        {/*<LeftMenu />*/}
        <div className="flex-1 h-full flex flex-col">
          <MainArea></MainArea>
          <TerminalArea />
        </div>
      </div>
    </div>
  )
}

export default APP;
=======

const HomePage = () => {
    return (
        <div>Hello world!</div>
    )
}

export default HomePage;
>>>>>>> 980007e7796862484fdc37f75638889c02946af5
