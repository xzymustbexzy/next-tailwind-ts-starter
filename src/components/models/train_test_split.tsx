import {Box, Paper, Slider} from "@mui/material";


function valuetext(value: number) {
  return `${value}%`;
}

const TrainTestNumberInfo = (props: {
  title: string,
  imagesNum: number,
  percentage: number,
  color: string,
}) => {
  return <Paper elevation={2} >
    <div className={"w-full h-full flex px-5 py-4"}>
      <div className={"w-3/4"}>
        <div className={"text-gray-600 text-lg h-1/2"}>{props.title}</div>
        <div className={"h-1/2 flex gap-4 items-end"}>
          <span className={"text-3xl font-bold"}>{props.imagesNum}</span>
          <span className={"text-base"}>images</span>
        </div>
      </div>
      <div className={"h-full w-full flex justify-end items-center"}>
        <div className={`text-white font-bold text-lg h-8 w-20 rounded-2xl flex justify-center items-center text-center ${props.color}`}>{props.percentage}%</div>
      </div>
    </div>
  </Paper>
}

const TrainTestSplit = () => {
  const marks = [];
  for (let i = 0; i <= 100; i += 10) {
    marks.push({
      value: i, label: i + "%"
    });
  }

  return <div className={"w-full flex flex-col"}>
    <Slider
        track={false}
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[70, 90]}
        marks={marks}
    />
    <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 2,
            width: "30%",
            height: 128,
          },
        }}
    >
      <TrainTestNumberInfo title={"Training Set"} imagesNum={612} percentage={70} color={"bg-amber-500"} />
      <TrainTestNumberInfo title={"Training Set"} imagesNum={123} percentage={20} color={"bg-cyan-500"} />
      <TrainTestNumberInfo title={"Training Set"} imagesNum={53} percentage={10} color={"bg-green-500"} />
    </Box>
    <div className={"flex flex-wrap gap-x-5 gap-y-3 flex-1 overflow-y-scroll px-8"}>
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
      <img className={"w-40 h-24"} src={"/assets/test/test.png"} />
    </div>
  </div>
};

export default TrainTestSplit;
