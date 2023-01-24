import {
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React, {useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


const Train = () => {
  const [pretrainedModel, setPretrainedModel] = useState<string>("Yolo v5s");

  return <div className={"flex gap-5 py-4 h-full"}>
    <Card className={"w-full h-full px-6 py-4"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-xl font-semibold"}>
          Model Definition
        </div>
      </div>
      <CardContent className={"flex justify-between"}>
        <div
            className={"flex items-center"}
        >
          <div className={"whitespace-nowrap mr-4 font-bold"}>Pretrained Model:</div>
          <FormControl
              className={"w-64"}
              size={"small"}
          >
            <InputLabel>model name</InputLabel>
            <Select
                value={pretrainedModel}
                label="model name"
                onChange={(event: SelectChangeEvent) => {
                  setPretrainedModel(event.target.value);
                }}
            >
              <MenuItem value={"34EDc0878A3556c7"}>YOLOv5n</MenuItem>
              <MenuItem value={"13D38115C01Fd198"}>YOLOv5s</MenuItem>
              <MenuItem value={"07B4798d4981a30E"}>YOLOv5m</MenuItem>
              <MenuItem value={"a7c78731c9472d4f"}>YOLOv5l</MenuItem>
              <MenuItem value={"34EDc0878A3556c7"}>YOLOv5x</MenuItem>
              <MenuItem value={"13D38115C01Fd198"}>YOLOv5n6</MenuItem>
              <MenuItem value={"07B4798d4981a30E"}>YOLOv5s6</MenuItem>
              <MenuItem value={"a7c78731c9472d4f"}>YOLOv5m6</MenuItem>
              <MenuItem value={"34EDc0878A3556c7"}>YOLOv5l6</MenuItem>
              <MenuItem value={"13D38115C01Fd198"}>YOLOv5x6+TTA</MenuItem>
              <MenuItem value={"07B4798d4981a30E"}>Yolo v5l</MenuItem>
              <MenuItem value={"a7c78731c9472d4f"}>DETRAC[a7c787...]</MenuItem>
              <MenuItem value={"34EDc0878A3556c7"}>Yolo v5s</MenuItem>
              <MenuItem value={"13D38115C01Fd198"}>Yolo v5m</MenuItem>
              <MenuItem value={"07B4798d4981a30E"}>Yolo v5l</MenuItem>
              <MenuItem value={"a7c78731c9472d4f"}>DETRAC[a7c787...]</MenuItem>
            </Select>
          </FormControl>
          <IconButton
              className={"w-8 h-8"}
              aria-label="create-stream"
              color={"primary"}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          {/*<IconButton*/}
          {/*    className={"w-8 h-8"}*/}
          {/*    aria-label="detail-setting"*/}
          {/*    color={"primary"}*/}
          {/*>*/}
          {/*  <VideoSettingsIcon />*/}
          {/*</IconButton>*/}
        </div>);
      </CardContent>
    </Card>
    <Card className={"w-full h-full px-6 py-4"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-xl font-semibold"}>
          Training Configuration
        </div>
      </div>
      <CardContent className={"flex justify-between"}>
      </CardContent>
    </Card>
    <Card className={"w-full h-full px-6 py-4"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-xl font-semibold"}>
          Advanced
        </div>
      </div>
      <CardContent className={"flex justify-between"}>
      </CardContent>
    </Card>
  </div>
}

export default Train;