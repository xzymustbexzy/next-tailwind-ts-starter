import {Card, CardContent} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpIcon from '@mui/icons-material/Help';


const AddStep = (props: {
  title: string
}) => {
  return <div className={"flex gap-2 cursor-pointer hover:bg-gray-200/50 hover:text-amber-600 h-12 w-full items-center px-2 rounded-md border-gray-400/40 border"}>
    <AddCircleOutlineIcon />
    <div className={"text-lg"}>{props.title}</div>
  </div>
}

const Preprocessing = () => {
  return <div className={"flex gap-16 py-10"}>
    <Card className={"w-full h-full px-6 py-4"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-2xl font-semibold"}>
          Transformation
        </div>
        <HelpIcon fontSize="small" color="info" className={"cursor-pointer"} />
      </div>
      <CardContent className={"flex justify-between"}>
        <AddStep title={"Add Transformation Step"} />
      </CardContent>
    </Card>
    <Card className={"w-full h-full px-6 py-4"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-2xl font-semibold"}>
          Data Argumentation
        </div>
        <HelpIcon fontSize="small" color="info" className={"cursor-pointer"} />
      </div>
      <CardContent className={"flex justify-between"}>
        <AddStep title={"Add Data Argumentation"} />
      </CardContent>
    </Card>
  </div>
}

export default Preprocessing;
