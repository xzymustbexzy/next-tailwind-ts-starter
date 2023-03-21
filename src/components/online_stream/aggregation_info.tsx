import {Card, CardContent} from "@mui/material";
import React from "react";


const AggregationInfo = () => {
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
}

export default AggregationInfo;
