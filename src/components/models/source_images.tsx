import { FileUploader } from "react-drag-drop-files";
import {useState} from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const fileTypes = ["JPG", "PNG", "GIF"];

const SourceImages = () => {
  const [file, setFile] = useState<any>(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  return <div className={"w-full"}>
    <div className={"text-2xl font-bold py-6"}>Upload</div>
      <div className={"w-full flex justify-center"}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          multiple={true}
          hoverTitle={"Drop here"}
          classes={"w-full max-w-none h-64 text-[40px]"}
        />
      </div>
    <div className={"py-6"}><span className={"mr-2 italic"}>OR</span> <span className={"text-2xl font-bold"}>Select From Database</span></div>
    <TextareaAutosize
      className={"border-2 border-gray-500 rounded-md no-underline w-full flex-1 outline-none text-lg resize-none px-3"}
      placeholder="Type query VMQL here..."
      style={{
        fontFamily: "monospace",
      }}
    />
  </div>;
};

export default SourceImages;
