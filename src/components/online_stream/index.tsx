import React, {useEffect, useRef} from "react";
import flvjs from "flv.js";
import {ConfigBar} from "@/components/online_stream/config_bar";
import MapComponent from "@/components/online_stream/map_component";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ViewListIcon from '@mui/icons-material/ViewList';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader, FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

// const sampleVideos = [
//   'assets/videos_sample/resultMOT17-04-FRCNN.flv',
//   'assets/videos_sample/resultMOT17-02-FRCNN.flv',
//   'assets/videos_sample/resultMOT17-10-FRCNN.flv',
//   'assets/videos_sample/resultMOT17-09-FRCNN.flv',
//   'assets/videos_sample/resultMOT17-11-FRCNN.flv',
//   'assets/videos_sample/resultMOT17-13-FRCNN.flv',
// ]

const sampleVideos = [
  'assets/mp4_sample/1.mp4',
  'assets/mp4_sample/2.mp4',
  'assets/mp4_sample/3.mp4',
  'assets/mp4_sample/4.mp4',
  'assets/mp4_sample/5.mp4'
]


export const OnlineStreamPanel = () => {
  // const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  type ModuleType = typeof flvjs ;

  useEffect(() => {
    // (async () => {
      // const flvjs_ = await import('flv.js');
      // const flvjs = flvjs_ as unknown as ModuleType;
      // if (videoRef?.current && flvjs.isSupported()) {
      //   videoRef.current.forEach((videoElem, index) => {
      //     if (videoElem) {
      //       let flvPlayer = flvjs.createPlayer({
      //         url: sampleVideos[index],
      //         type: 'mp4'
      //       }, {});
      //       flvPlayer.attachMediaElement(videoElem);
      //       flvPlayer.load();
      //       flvPlayer.play();
      //     }
      //   })
      // }

      // if (videoRef?.current && flvjs.isSupported()) {
      //   let flvPlayer = flvjs.createPlayer({
      //     url: sampleVideos[0],
      //     type: 'mp4'
      //   }, {});
      //   flvPlayer.attachMediaElement(videoRef.current);
      //   flvPlayer.load();
      //   flvPlayer.play();
      // }
    // })();
  }, [])

  return <div className={"flex w-full h-full"}>
    <ConfigBar />
    <div className={"flex-1 h-full flex justify-between overflow-y-scroll py-4"}>
      <div className={"w-full flex"}>
        <Card className={"h-full flex flex-col w-full"}>
          <CardContent className={"flex flex-col px-2 py-0"} >
            <div className={"w-full text-center py-1 flex justify-between items-center px-1 flex"}>
              <div className={"text-lg font-bold"}>Map</div>
              <div><span style={{color: "green"}}>● </span> <span>online cameras: 200</span></div>
            </div>
            <div className={"border-gray-500/50 border-2"}
              style={{
                height: "500px",
              }}
            >
              <MapComponent />
            </div>
          </CardContent>
        </Card>
        <div className={"w-96 mx-2"}>
          <Card className={"h-full flex flex-col"}>
            <CardContent className={"flex flex-col px-2 py-0"} style={{
              height: "540px"
            }}>
              <div className={"w-full text-center py-1 flex justify-between items-center px-1"}>
                <div className={"font-bold text-lg"}>Query results</div>
                <div className={"text-sm font-light flex grid-1"}>
                  <ViewCompactIcon />
                  <ViewModuleIcon />
                  <ViewListIcon />
                </div>
              </div>
              <div className={"w-full flex border-t border-t-gray-500/50 py-1 overflow-y-scroll flex flex-wrap gap-2"}>
                {
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                    <div key={item.toString()+index.toString()} className={"cursor-pointer w-32"}>
                      <img src={`assets/topk_samples/${item}.png`} />
                    </div>
                  ))
                }
              </div>
            </CardContent>
            {/*<CardActions className={"flex flex-col"}>*/}
            {/*  <FormControl size="small" fullWidth>*/}
            {/*    <InputLabel id="select-top-k-query-label">Top-K query</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="select-top-k-query-label"*/}
            {/*        id="demo-simple-select"*/}
            {/*        label="Top-K query"*/}
            {/*    >*/}
            {/*      <MenuItem value={10}>Total volume</MenuItem>*/}
            {/*      <MenuItem value={20}>Pedestrians number</MenuItem>*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*</CardActions>*/}
          </Card>
        </div>
      </div>
    </div>
  </div>
}
