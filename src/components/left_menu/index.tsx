import SensorsIcon from '@mui/icons-material/Sensors';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { motion } from "framer-motion";
import {useRef, useState} from "react";
import {useActivePageContext} from "@/context/active_page";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

const MenuItem = (props: {
  title: string;
  icon: React.ReactNode;
  iconActiveColor?: string;
  onClick?: () => any;
  active?: boolean;
  collapse?: boolean;
}) => {
  const iconActiveColorOnHover = 'group-hover:' + props.iconActiveColor;
  return (
    <div
      className={`px-4 w-full h-14 cursor-pointer hover:bg-slate-300/50 ${props?.active ? 'bg-slate-300/75 font-bold text-gray-900' : ''} transition-all duration-200 group rounded-b-md`}
      onClick={() => {
        if (props?.onClick) {
          props.onClick();
        }
      }}
    >
      <div className="w-full h-full flex justify-start items-center gap-3 border-b border-b-slate-200">
        <div className={`${iconActiveColorOnHover} ${props?.active ? props.iconActiveColor : ''}  group-hover:font-bold`}>
          {props.icon}
        </div>
        {
          props?.collapse ||
          <div className="text-gray-700 text-lg group-hover:font-bold group-hover:text-gray-900 transition-all duration-200 whitespace-nowrap">{props.title}</div>
        }
      </div>
    </div>
  )
}

export const LeftMenu = () => {
  const {page, setPage} = useActivePageContext();
  const [collapse, setCollapse] = useState<boolean>(false);
  const menuDivRef = useRef<HTMLDivElement>(null);

  return (
      <div
        className="w-64 h-full border-r border-slate-300 relative transition-all duration-1000"
        ref={menuDivRef}
      >
        <div
            className={"absolute right-0 top-0 h-full flex items-center cursor-pointer"}
            onClick={() => {
              if (!collapse) {
                if (menuDivRef?.current) {
                  menuDivRef.current.style.width = "64px";
                }
                setCollapse(true);
              } else {
                if (menuDivRef?.current) {
                  menuDivRef.current.style.width = "256px";
                }
                setCollapse(false);
              }
            }}
        >
          {
              collapse ||
              <ExpandLessIcon preserveAspectRatio="none"
                              className={"w-[30px] h-[20px] font-bold rotate-[270deg] scale-150 translate-x-2 text-black/50"}/>
          }
          {
              collapse &&
              <ExpandLessIcon preserveAspectRatio="none"
                              className={"w-[30px] h-[20px] font-bold rotate-90 scale-150 translate-x-2 text-black/50"}/>
          }
          <div className={"h-full w-[4px] bg-slate-300/50 border-l border-slate-300"} style={{
            boxShadow: "1px 0px 4px rgba(203 213 225 / 0.5)"
          }}></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-1 py-2 px-1 overflow-x-hidden">
          <MenuItem
            title="Online Stream"
            icon={<SensorsIcon/>}
            collapse={collapse}
            iconActiveColor="text-orange-700"
            onClick={() => {
              setPage("online_stream");
            }}
            active={page === 'online_stream'}
          />
          <MenuItem
            title="Models"
            icon={<ModelTrainingIcon/>}
            collapse={collapse}
            iconActiveColor="text-lime-700"
            onClick={() => {
              setPage("models");
            }}
            active={page === 'models'}
          />
          <MenuItem
            title="Documents"
            icon={<CodeIcon/>}
            collapse={collapse}
            iconActiveColor="text-yellow-700"
            onClick={() => {
              setPage("documents");
            }}
            active={page === 'documents'}
          />
        </div>
      </div>
  )
};