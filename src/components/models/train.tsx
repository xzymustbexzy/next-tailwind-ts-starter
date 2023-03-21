import {
  Box,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, TextField
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React, {useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ minWidth: 430 }}>
          <Typography variant="body2" color="text.secondary">
            {"21/267 [01:18<15:51,  3.87s/it] (Acc: 0.69, Recall: 0.62 F1: 0.64)"}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
  );
}


const Train = () => {
  const [pretrainedModel, setPretrainedModel] = useState<string>("Yolo v5s");
  const [task, setTask] = useState<string>("object detection");
  const [predictionHeader, setPredictionHeader] = useState<string>("linear");
  const [device, setDevice] = useState<string>("cuda:0");
  const [lossFunc, setLossFunc] = useState<string>("YOLO loss");
  const [trainingProcess, setTrainingProcess] = useState<number>(20);

  return <div className={"h-full w-full"}>
    <div className={"flex gap-5 py-4 h-full"}>
      <Card className={"w-full h-full px-6 py-4"}>
        <div className={"flex items-center gap-2"}>
          <div className={"text-xl font-semibold"}>
            Model Definition
          </div>
        </div>
        <CardContent className={"justify-between px-0 flex flex-col gap-2"}>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Task: </div>
            <FormControl
                className={"w-36"}
                size={"small"}
            >
              <InputLabel>task</InputLabel>
              <Select
                  value={task}
                  label="task"
                  onChange={(event: SelectChangeEvent) => {
                    setTask(event.target.value);
                  }}
              >
                <MenuItem value={"classification"}>classification</MenuItem>
                <MenuItem value={"regression"}>regression</MenuItem>
                <MenuItem value={"object detection"}>object detection</MenuItem>
                <MenuItem value={"instance segmentation"}>instance segmentation</MenuItem>
                <MenuItem value={"semantic segmentation"}>semantic segmentation</MenuItem>
                <MenuItem value={"key points detection"}>key points detection</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Pretrained model:</div>
            <FormControl
                className={"w-36"}
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
                <MenuItem value={"YOLOv5n"}>YOLOv5n</MenuItem>
                <MenuItem value={"YOLOv5s"}>YOLOv5s</MenuItem>
                <MenuItem value={"YOLOv5m"}>YOLOv5m</MenuItem>
                <MenuItem value={"YOLOv5l"}>YOLOv5l</MenuItem>
                <MenuItem value={"YOLOv5x"}>YOLOv5x</MenuItem>
                <MenuItem value={"YOLOv5n6"}>YOLOv5n6</MenuItem>
                <MenuItem value={"YOLOv5s6"}>YOLOv5s6</MenuItem>
                <MenuItem value={"YOLOv5m6"}>YOLOv5m6</MenuItem>
                <MenuItem value={"YOLOv5l6"}>YOLOv5l6</MenuItem>
                <MenuItem value={"YOLOv5x6+TTA"}>YOLOv5x6+TTA</MenuItem>
                <MenuItem value={"Faster R-CNN R50-C4"}>Faster R-CNN R50-C4</MenuItem>
                <MenuItem value={"Faster R-CNN R50-DC5"}>Faster R-CNN R50-DC5</MenuItem>
                <MenuItem value={"Faster R-CNN R50-FPN"}>Faster R-CNN R50-FPN</MenuItem>
                <MenuItem value={"Faster R-CNN R101-FPN"}>Faster R-CNN R101-FPN</MenuItem>
                <MenuItem value={"Faster R-CNN X101-FPN"}>Faster R-CNN X101-FPN</MenuItem>
                <MenuItem value={"RetinaNet R50"}>RetinaNet R50</MenuItem>
                <MenuItem value={"RetinaNet R101"}>RetinaNet R101</MenuItem>
                <MenuItem value={"RPN R50-C4"}>RPN R50-C4</MenuItem>
                <MenuItem value={"RPN R50-FPN"}>RPN R50-FPN</MenuItem>
                <MenuItem value={"Fast R-CNN R50-FPN"}>Fast R-CNN R50-FPN</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Number of classes: </div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Hidden size: </div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Prediction header: </div>
            <FormControl
                className={"w-36"}
                size={"small"}
            >
              <InputLabel>header</InputLabel>
              <Select
                  value={predictionHeader}
                  label="header"
                  onChange={(event: SelectChangeEvent) => {
                    setPredictionHeader(event.target.value);
                  }}
              >
                <MenuItem value={"classification"}>linear</MenuItem>
                <MenuItem value={"regression"}>MLP</MenuItem>
                <MenuItem value={"object detection"}>Logistic</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"text-blue-600 cursor-pointer underline py-2"}>
            custom script
          </div>
        </CardContent>
      </Card>
      <Card className={"w-full h-full px-6 py-4"}>
        <div className={"flex items-center gap-2"}>
          <div className={"text-xl font-semibold"}>
            Training Configuration
          </div>
        </div>
        <CardContent className={"justify-between px-0 flex flex-col gap-2"}>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Total epochs:</div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Optimizer: </div>
            <FormControl
                className={"w-36"}
                size={"small"}
            >
              <InputLabel>loss</InputLabel>
              <Select
                  value={lossFunc}
                  label="loss"
                  onChange={(event: SelectChangeEvent) => {
                    setLossFunc(event.target.value);
                  }}
              >
                <MenuItem value={"YOLO loss"}>SGD</MenuItem>
                <MenuItem value={"FOCAL loss"}>Adam</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Loss function: </div>
            <FormControl
                className={"w-36"}
                size={"small"}
            >
              <InputLabel>loss</InputLabel>
              <Select
                  value={lossFunc}
                  label="loss"
                  onChange={(event: SelectChangeEvent) => {
                    setLossFunc(event.target.value);
                  }}
              >
                <MenuItem value={"YOLO loss"}>YOLO loss</MenuItem>
                <MenuItem value={"FOCAL loss"}>FOCAL loss</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Learning rate:</div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Batch size:</div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Device: </div>
            <FormControl
                className={"w-36"}
                size={"small"}
            >
              <InputLabel>task</InputLabel>
              <Select
                  value={device}
                  label="device"
                  onChange={(event: SelectChangeEvent) => {
                    setDevice(event.target.value);
                  }}
              >
                <MenuItem value={"classification"}>cpu</MenuItem>
                <MenuItem value={"regression"}>cude:0</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>
      <Card className={"w-full h-full px-6 py-4"}>
        <div className={"flex items-center gap-2"}>
          <div className={"text-xl font-semibold"}>
            Advanced
          </div>
        </div>
        <CardContent className={"justify-between px-0 flex flex-col gap-2"}>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"w-full bg-slate-100/50 border-gray-500/50 border rounded-md flex justify-center items-center cursor-pointer py-1"}>
              Set Early Stop
            </div>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"w-full bg-slate-100/50 border-gray-500/50 border rounded-md flex justify-center items-center cursor-pointer py-1"}>
              Set Learning Rate Finder
            </div>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"w-full bg-slate-100/50 border-gray-500/50 border rounded-md flex justify-center items-center cursor-pointer py-1"}>
              Set Training Monitor
            </div>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"w-full bg-slate-100/50 border-gray-500/50 border rounded-md flex justify-center items-center cursor-pointer py-1"}>
              Enable Model Pruning
            </div>
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Gradient accumulate:</div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
          <div
              className={"flex items-center h-12 justify-between"}
          >
            <div className={"whitespace-nowrap mr-4"}>Warm start steps:</div>
            <TextField
                id="outlined-number"
                label=""
                type="number"
                size="small"
                className={"w-36"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={20} />
    </Box>
  </div>
}

export default Train;