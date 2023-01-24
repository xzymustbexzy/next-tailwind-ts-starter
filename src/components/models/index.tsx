import {
  Box,
  Button,
  Paper, Step, StepLabel, Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import React from "react";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import SourceImages from "@/components/models/source_images";
import TrainTestSplit from "@/components/models/train_test_split";
import Preprocessing from "@/components/models/preprocessing";
import Train from "@/components/models/train";

function createData(
  tag: string,
  hash: string,
  dataset: string,
  config: object,
  summary: object,
) {
  return { tag, hash, dataset, config, summary };
}

const rows = [
  createData('Faster RCNN R50: v0.1', '0x02e4a69df', 'COCO', {learning_rate: 1e-3, batch_size: 64, optimizer: 'Adam', loss_function: 'CrossEncropy'}, {best_mAP: 0.54, best_mAP_50: 0.61, best_mAP_75: 0.70}),
  createData('Segformer: v0.2', '0xk83a6o56e', 'ImageNet', {learning_rate: 2e-4, batch_size: 32, optimizer: 'SGD', loss_function: 'soft Dice loss'}, {best_F1: 0.53}),
];

const ModelOverview = (props: {
  className?: string,
  onClickCreateModel?: () => any,
}) => {
  return <div className={`${props?.className ?? ""} absolute transition-opacity duration-300 w-full`}>
    <div className="my-2">
      <Button variant="contained" className="h-10 bg-purple-500" onClick={() => {
        if (props?.onClickCreateModel) {
          props.onClickCreateModel();
        }
      }}>Create New Model</Button>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tag</TableCell>
            <TableCell align="left">Hash</TableCell>
            <TableCell align="left">Dataset</TableCell>
            <TableCell align="left">Config</TableCell>
            <TableCell align="left">Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow
                  key={row.tag}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row.tag}
                </TableCell>
                <TableCell align="left">{row.hash}</TableCell>
                <TableCell align="left">{row.dataset}</TableCell>
                <TableCell align="left">{row.config.toString()}</TableCell>
                <TableCell align="left">{row.summary.toString()}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
}


const steps = [
  'Source Images',
  'Train/Test Split',
  'Preprocessing',
  'Train',
  'Deploy',
];

const CreateModel = (props: {
  className?: string
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return <div className={`${props?.className ?? ""} absolute transition-opacity duration-300 delay-300 w-[95%]`}>
    <Box sx={{width: '100%'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{mt: 2, mb: 1}}>
              Training model
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Box sx={{flex: '1 1 auto'}}/>
              <Button onClick={handleReset}>Start Training</Button>
            </Box>
          </React.Fragment>
      ) : (
          <React.Fragment>
            <Typography sx={{mt: 2, mb: 1}}>
              <div className={"h-[440px] px-6"}>
                {
                    activeStep === 0 && <SourceImages/>
                }
                {
                    activeStep === 1 && <TrainTestSplit/>
                }
                {
                    activeStep === 2 && <Preprocessing/>
                }
                {
                    activeStep === 3 && <Train/>
                }
              </div>
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{mr: 1}}
              >
                Back
              </Button>
              <Box sx={{flex: '1 1 auto'}}/>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Start Training' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
      )}
    </Box>
  </div>;
}

export const ModelsPanel = () => {
  const [currentPage, setCurrentPage] = useState<string>("create_model");

  return <div className="px-4 py-3 relative">
    <ModelOverview
        className={currentPage === "overview" ? "opacity-100" : "opacity-0"}
        onClickCreateModel={() => {
          setCurrentPage("create_model");
        }}
    />
    <CreateModel className={currentPage === "create_model" ? "opacity-100" : "opacity-0"}></CreateModel>
  </div>
}
