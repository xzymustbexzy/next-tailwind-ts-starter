import { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import TerminalIcon from '@mui/icons-material/Terminal';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Logo = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="px-6 h-full flex items-center cursor-pointer">
      <div className="">
        <img className="h-9" src="/assets/logo/DoveDBlatestlogo.png"/>
      </div>
    </div>
  )
}

const HeaderLinkWrapper = (props: {
  children: React.ReactNode,
  textHint?: string
}) => {
  return (
    <div className="flex flex-col w-10 max-w-10 overflow-visible justify-center items-center relative">
      <div className="mb-3 h-10 w-10 p-1 border border-slate-300 rounded cursor-pointer hover:text-brand hover:bg-zinc-100 transition-all duration-200 peer">
        {props.children}
      </div>
      {
        props?.textHint && 
        <div className="absolute py-1 text-white opacity-0 peer-hover:opacity-100 transition-all duration-300 z-[-1]">
          <div className="px-2 whitespace-nowrap rounded-lg bg-zinc-800/75 flex justify-center text-center text-sm">{props.textHint}</div>
        </div>
      }
    </div>
  )
}

const SearchBar = () => {
  return (
    <div className="h-10 w-64 border border-slate-300 px-2 rounded flex gap-2 focus-within:border-brand focus-within:border-2 transition-all duration-200">
      <SearchIcon className="h-full" />
      <Input className="h-full w-full " placeholder="Search..." disableUnderline />
    </div>
  )
}

export const Header = () => {
  return (
  <div className="w-screen bg-white h-16 border-b border-b-slate-300 z-30 fixed top-0">
    <div className="flex justify-start items-center h-full w-full">
      <Logo />
      {/*<div className="h-full flex gap-4 items-start pt-3 px-7">*/}
      {/*  <SearchBar />*/}
      {/*  <HeaderLinkWrapper textHint="Open terminal"><TerminalIcon className="w-full h-full"/></HeaderLinkWrapper>*/}
      {/*  <HeaderLinkWrapper textHint="Dark mode"><DarkModeIcon className="w-full h-full"/></HeaderLinkWrapper>*/}
      {/*  <HeaderLinkWrapper textHint="Github link"><GitHubIcon className="w-full h-full"/></HeaderLinkWrapper>*/}
      {/*</div>*/}
      <div className="h-full flex gap-4 items-start w-full flex items-center justify-center mr-[150px]">
        <span style={{
          fontFamily: "Helvetica",
          fontSize: "21px",
          fontWeight: "600",
        }}>DoveDB: A Declarative and Low-Latency Video Database</span>
      </div>
    </div>
  </div>);
}
