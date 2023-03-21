import {
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Card,
  SelectChangeEvent,
  Slider,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Rating, Input
} from "@mui/material";
import {useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player';

const StreamSelection = () => {
  const [streamId, setStreamId] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStreamId(event.target.value);
  };

  return (<div
    className={"flex items-center"}
  >
    <div className={"whitespace-nowrap mr-4 font-bold text-lg"}>Select camera:</div>
    <FormControl
        className={"w-64 px-1"}
        size={"small"}
    >
      <InputLabel>camera id</InputLabel>
      <Select
          value={streamId}
          label="camera id"
          onChange={handleChange}
      >
        <MenuItem value={"34EDc0878A3556c7"}>MOT[34EDc08...]</MenuItem>
        <MenuItem value={"13D38115C01Fd198"}>JACKSON TOWN[13D381...]</MenuItem>
        <MenuItem value={"07B4798d4981a30E"}>TAIPEI[07B479...]</MenuItem>
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
}


const sampleModels = [
  {
    modelName: 'car_classfier',
    modelType: 'resnet'
  },
  {
    modelName: 'road seg',
    modelType: 'unet'
  },
  {
    modelName: 'noscope',
    modelType: 'resnet'
  },
  {
    modelName: 'jam detector',
    modelType: 'retinanet'
  },
  {
    modelName: 'yolo small',
    modelType: 'yolo'
  }
]

export const ConfigBar = () => {

  const [streamId, setStreamId] = useState<string>('');
  const [dense, setDense] = useState<boolean>(true);
  const [selectedChannel, setSelectedChannel] = useState<string>('192.168.23.53');
  const [modelId, setModelId] = useState<string>('');
  const [modelList, setModelList] = useState<{ modelName: string; modelType: string; }[]>(sampleModels);

  const handleChange = (event: SelectChangeEvent) => {
    setStreamId(event.target.value);
  };

  return <div className={"h-full flex flex-col justify-between px-4 relative pt-[16px]"}
      style={{
        width: "370px"
      }}
  >
    {/*<Card*/}
    {/*  variant="outlined"*/}
    {/*  className={"absolute top-2 right-8 z-20"}*/}
    {/*>*/}
    {/*  <DetailedConfigCard />*/}
    {/*</Card>*/}
    <Card sx={{ minWidth: 275 }}>
      <CardContent className={"flex flex-col gap-3 py-2"}>
        <Typography>
          <StreamSelection />
        </Typography>
        {/*<Typography>*/}
        {/*  <div className={"flex gap-2 items-center"}>*/}
        {/*    <div className={"font-bold"}>upload URL:</div>*/}
        {/*    <input className={"w-44 outline-none rounded-sm border border-gray-500/50"} readOnly={true} type="text" value="http://59.35.110.98:18000/gh23b09vb90b34blk3o2/upload" />*/}
        {/*    <CopyAllIcon className={"cursor-pointer"} />*/}
        {/*  </div>*/}
        {/*</Typography>*/}
        <Typography>
          <div className={"border-y pb-2"}>
            <ReactPlayer width={"100%"} height={190} url={'assets/mp4_sample/4.mp4'} playing={true} />
          </div>
        </Typography>
        <Typography>
          <div
              className={"items-center gap-4 border-t-2 border-b-gray-700 pt-2"}
          >
            <div className={"whitespace-nowrap font-bold text-lg"}>Models</div>
            <div className={"flex flex-wrap overflow-y-scroll max-h-56 h-56 gap-2"}>
              {
                modelList.map((item, index) => (
                    <div
                        key={item.modelName + index}
                        className={"w-24 h-28 cursor-pointer flex-col items-center justify-center text-center rounded-2xl border-r-neutral-600/30 border"}>
                      <img className={"px-2 h-20 pt-2"} src={"assets/models/" + item.modelType + ".png"} />
                      <div>{item.modelName}</div>
                    </div>
                ))
              }
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  </div>
}


// export const ConfigBar = () => {
//
//   const [streamId, setStreamId] = useState<string>('');
//   const [dense, setDense] = useState<boolean>(true);
//   const [selectedChannel, setSelectedChannel] = useState<string>('192.168.23.53');
//   const [modelId, setModelId] = useState<string>('');
//
//   const handleChange = (event: SelectChangeEvent) => {
//     setStreamId(event.target.value);
//   };
//
//   return <div className={"w-96 h-full flex flex-col justify-between px-4 relative py-3"}>
//     {/*<Card*/}
//     {/*  variant="outlined"*/}
//     {/*  className={"absolute top-2 right-8 z-20"}*/}
//     {/*>*/}
//     {/*  <DetailedConfigCard />*/}
//     {/*</Card>*/}
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent className={"flex flex-col gap-3 py-2"}>
//         <Typography>
//           <StreamSelection />
//         </Typography>
//         <Typography>
//           <div className={"flex gap-2 items-center"}>
//             <div className={"font-bold"}>upload URL:</div>
//             <input className={"w-44 outline-none rounded-sm border border-gray-500/50"} readOnly={true} type="text" value="http://59.35.110.98:18000/gh23b09vb90b34blk3o2/upload" />
//             <CopyAllIcon className={"cursor-pointer"} />
//           </div>
//         </Typography>
//         <Typography>
//           <div className={"border-y border-y-gray-500/50"}>
//             <div className={"py-[1px]"}>Current number of channels: 30</div>
//             <List dense={dense} className={"h-40 overflow-y-scroll"}>
//               {[
//                 "overview",
//                 "192.168.23.53",
//                 "192.168.23.79",
//                 "192.168.23.197",
//                 "192.168.23.224",
//                 "192.168.23.102",
//                 "192.168.23.1",
//                 "192.168.23.2",
//                 "192.168.23.32",
//                 "192.168.23.4",
//                 "192.168.23.79",
//                 "192.168.23.54",
//                 "192.168.23.85",
//                 "192.168.23.53",
//                 "192.168.23.65",
//                 "192.168.23.112",
//                 "192.168.23.39",
//                 "192.168.23.210",
//                 "192.168.23.13",
//                 "192.168.23.43",
//                 "192.168.23.145",
//                 "192.168.23.183",
//                 "192.168.23.200",
//                 "192.168.23.201",
//                 "192.168.23.134",
//                 "192.168.23.100",
//               ].map((value) => React.cloneElement(
//                   <ListItem
//                     secondaryAction={
//                       value !== "overview" && <IconButton size="small">
//                         <ClearIcon />
//                       </IconButton>
//                     }
//                     className={`cursor-pointer hover:bg-amber-300/40 ${selectedChannel === value ? 'bg-amber-400/40' : ''}`}
//                   >
//                     <ListItemAvatar>
//                       <Avatar sx={{ width: 32, height: 32 }}>
//                         <SlideshowIcon />
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={value}
//                     />
//                   </ListItem>, {
//                 key: value,
//               }),
//               )}
//             </List>
//           </div>
//         </Typography>
//         <Typography>
//           <div
//               className={"flex items-center gap-4"}
//           >
//             <div className={"whitespace-nowrap font-bold"}>Ingestion FPS</div>
//             <Slider defaultValue={20} aria-label="Default" valueLabelDisplay="auto" min={1} max={120} className={"w-40"}  />
//             <Input
//                 value={20}
//                 size="small"
//                 inputProps={{
//                   step: 10,
//                   min: 0,
//                   max: 100,
//                   type: 'number',
//                   'aria-labelledby': 'input-slider',
//                 }}
//             />
//           </div>
//         </Typography>
//         <Typography>
//           <div
//               className={"flex items-center gap-2 justify-between"}
//           >
//             <div className={"whitespace-nowrap font-bold"}>Inference model</div>
//             <div className={"flex items-center gap-2"}>
//               <Select
//                   value={modelId}
//                   displayEmpty
//                   inputProps={{ 'aria-label': 'Without label' }}
//                   className={"w-40 h-8"}
//                   onChange={(event: SelectChangeEvent) => {
//                     setModelId(event.target.value)
//                   }}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={1}>Yolo v5s detector</MenuItem>
//                 <MenuItem value={2}>NoScope</MenuItem>
//                 <MenuItem value={3}>Blazeit</MenuItem>
//                 <MenuItem value={4}>Everest</MenuItem>
//                 <MenuItem value={5}>MIRIS</MenuItem>
//                 <MenuItem value={6}>Otif</MenuItem>
//               </Select>
//               <VisibilityIcon className={"cursor-pointer"} />
//             </div>
//           </div>
//         </Typography>
//         <Typography>
//           <div className={"flex gap-2"}>
//             <div className={"font-bold"}>Accelerate mode</div>
//             <Rating
//                 name="customized-color"
//                 defaultValue={2}
//                 getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
//                 icon={<FastForwardIcon fontSize="inherit" />}
//                 emptyIcon={<PauseIcon fontSize="inherit" />}
//             />
//             <div>
//               fast
//             </div>
//           </div>
//         </Typography>
//         <Typography>
//           <div
//               className={"flex items-center gap-4"}
//           >
//             <div className={"whitespace-nowrap font-bold"}>Micro-batch size</div>
//             <Slider defaultValue={8} aria-label="Default" valueLabelDisplay="auto" min={1} max={32} className={"w-40"}  />
//             <Input
//                 value={8}
//                 size="small"
//                 inputProps={{
//                   step: 10,
//                   min: 0,
//                   max: 100,
//                   type: 'number',
//                   'aria-labelledby': 'input-slider',
//                 }}
//             />
//           </div>
//         </Typography>
//         <Typography>
//           <div
//               className={"flex items-center gap-2 justify-between"}
//           >
//             <div className={"whitespace-nowrap font-bold"}>Run on device</div>
//             <div className={"flex items-center gap-2"}>
//               <Select
//                   value={"CPU"}
//                   inputProps={{ 'aria-label': 'Without label' }}
//                   className={"w-40 h-8"}
//                   onChange={(event: SelectChangeEvent) => {
//                     setModelId(event.target.value)
//                   }}
//               >
//                 <MenuItem value={"CPU"}>CPU</MenuItem>
//                 <MenuItem value={2}>Cuda 0: GTX 3090(24G)</MenuItem>
//                 <MenuItem value={3}>Cuda 1: GTX A100(32G)</MenuItem>
//               </Select>
//             </div>
//           </div>
//         </Typography>
//       </CardContent>
//       <CardActions className={"flex justify-between items-center py-1"}>
//         <div
//             className={"flex items-center gap-1"}
//         >
//           <div className={"whitespace-nowrap"}>Automatic Configuration</div>
//           <Checkbox defaultChecked />
//         </div>
//         <Button size="small" className={"bg-green-700/80 text-white font-bold"}>APPLY</Button>
//       </CardActions>
//     </Card>
//   </div>
// }
