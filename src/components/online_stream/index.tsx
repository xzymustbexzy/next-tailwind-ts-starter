import React, {useEffect, useRef} from "react";
import flvjs from "flv.js";
import {ConfigBar} from "@/components/online_stream/config_bar";
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
    (async () => {
      const flvjs_ = await import('flv.js');
      const flvjs = flvjs_ as unknown as ModuleType;
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
      if (videoRef?.current && flvjs.isSupported()) {
        let flvPlayer = flvjs.createPlayer({
          url: sampleVideos[0],
          type: 'mp4'
        }, {});
        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        flvPlayer.play();
      }
    })();
  }, [])

  return <div className={"flex w-full h-full"}>
    <ConfigBar />
    <div className={"flex-1 h-full flex justify-between overflow-y-scroll py-4"}>
      <div className={"w-full flex"}>
        <div className={"flex-1 flex flex-col"}>
          {/*Preserve for overview*/}
          {/*<div className={"flex-1"}*/}
          {/*  style={{*/}
          {/*    display: "grid",*/}
          {/*    gridRowGap: "10px",*/}
          {/*    gridColumnGap: "20px",*/}
          {/*    gridTemplateColumns: "repeat(auto-fill, minmax(224px, max-content))",*/}
          {/*    justifyContent: "center",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {*/}
          {/*    sampleVideos.map((item, i) => (*/}
          {/*      <video*/}
          {/*        key={item + i}*/}
          {/*        className={"w-56 h-40"}*/}
          {/*        controls={true}*/}
          {/*        ref={el => videoRef.current[i] = el}*/}
          {/*      />*/}
          {/*    ))*/}
          {/*  }*/}
          {/*</div>*/}
          <div
            style={{
              height: "900px",
            }}
          >
            <video
              // className={"w-56 h-40"}
              className={"w-full my-5"}
              controls={true}
              ref={videoRef}
            />
          </div>
          <div className={"w-full h-full"}>
            <Card className={"w-full h-full"}>
              <CardContent className={"flex justify-between pb-2"}
                style={{
                  fontFamily: "ＭＳ Ｐゴシック"
                }}
              >
                <div className={"flex flex-col"}>
                  <code className={"font-bold"}>SIDEWALK</code>
                  <code>CAR: 1</code>
                  <code>BUS: 0</code>
                  <code>PEARSON: 2</code>
                </div>
                <div className={"flex flex-col"}>
                  <code className={"font-bold"}>ROAD LEFT</code>
                  <code>CAR: 1</code>
                  <code>BUS: 1</code>
                  <code>PEARSON: 0</code>
                </div>
                <div className={"flex flex-col"}>
                  <code className={"font-bold"}>ROAD MIDDLE</code>
                  <code>CAR: 6</code>
                  <code>BUS: 0</code>
                  <code>PEARSON: 0</code>
                </div>
                <div className={"flex flex-col"}>
                  <code className={"font-bold"}>ROAD RIGHT</code>
                  <code>CAR: 1</code>
                  <code>BUS: 0</code>
                  <code>PEARSON: 0</code>
                </div>
                <div className={"flex flex-col"}>
                  <code className={"font-bold"}>OVERALL</code>
                  <code>CAR: 9</code>
                  <code>BUS: 1</code>
                  <code>PEARSON: 2</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={"w-40 mx-2"}>
          <Card className={"h-full flex flex-col"}>
            <CardContent className={"flex flex-col"} style={{
              height: "480px"
            }}>
              <div className={"w-full font-bold text-center py-1"}>Top K frames</div>
              <div className={"w-full flex-1 border-y border-y-gray-500/50 py-1 overflow-y-scroll flex flex-col gap-2"}>
                {
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                    <div className={"cursor-pointer"}>
                      <img src={`assets/topk_samples/${item}.png`} />
                    </div>
                  ))
                }
              </div>
            </CardContent>
            <CardActions className={"flex flex-col"}>
              <FormControl size="small" fullWidth>
                <InputLabel id="select-top-k-query-label">Top-K query</InputLabel>
                <Select
                    labelId="select-top-k-query-label"
                    id="demo-simple-select"
                    label="Top-K query"
                >
                  <MenuItem value={10}>Total volume</MenuItem>
                  <MenuItem value={20}>Pedestrians number</MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  </div>
}
