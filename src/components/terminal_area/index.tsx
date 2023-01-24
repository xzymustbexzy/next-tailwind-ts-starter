import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Command} from "@/types/command";
import {forwardRef, RefObject, useEffect, useRef, useState} from "react";

const CommandRow = forwardRef((props: {
  command?: string,
  response?: string,
  sent?: boolean,
  onEnter?: (cmd: string) => any,
  autoFocus?: boolean,
}, ref: React.Ref<HTMLTextAreaElement>) => (
    <div className={"py-1"} style={{
      fontFamily: "monospace",
    }}>
      <div className={"h-full w-full flex gap-2 px-1"}>
        <div className={"font-bold text-lg"}>{">"}</div>
        <TextareaAutosize
            aria-label="empty textarea for command"
            placeholder="Enter VMQL instruction..."
            spellCheck={false}
            ref={ref}
            onChange={(e) => {
              const value = e.target.value;
              if (value.endsWith('\n')) {
                e.target.value = value.replace(/^\n|\n$/g, '');
                if (props?.onEnter) {
                  props.onEnter(e.target.value);
                }
              }
            }}
            className={"flex-1 outline-none text-lg resize-none"}
            defaultValue={props?.command ?? ""}
            readOnly={props?.sent}
            autoFocus={props.autoFocus}
        />
      </div>
      {
          props?.response &&
          <TextareaAutosize
              aria-label="empty textarea for response"
              spellCheck={false}
              readOnly={true}
              className={"h-full w-full flex gap-2 px-1 outline-none text-lg resize-none"}
              value={props?.response ?? ""}
          />
      }
    </div>
));


// const CommandRow = (props: {
//   command?: string,
//   response?: string,
//   sent?: boolean,
//   onEnter?: (cmd: string) => any,
//   autoFocus?: boolean,
//   ref?: React.Ref<HTMLTextAreaElement>,
// }) => {
// }

export const TerminalArea = () => {
  const [commandHistory, setCommandHistory] = useState<Command[]>([{
    command: "hello",
    response: "hi",
  }]);
  const currentRowRef = useRef<HTMLTextAreaElement>(null);
  const [length, setLength] = useState<number>(224);

  return (
    <div
      className={`flex flex-col`}
      style={{
        height: length + "px",
        minHeight: "40px",
      }}
      onClick={() => {
        if (currentRowRef?.current) {
          currentRowRef.current.focus();
        }
      }}
    >
      <div
        className={`bg-stone-200/60 bg-stone-400/90 h-4 cursor-row-resize`}
        onMouseDown={(mouseDownEvent) => {
          const startLength = length;
          const startPos = mouseDownEvent.pageY;
          const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            setLength(currentSize => (startLength + startPos - mouseMoveEvent.pageY));
          }
          const onMouseUp = () => {
            document.body.removeEventListener("mousemove", onMouseMove);
            // uncomment the following line if not using `{ once: true }`
            // document.body.removeEventListener("mouseup", onMouseUp);
          }

          document.body.addEventListener("mousemove", onMouseMove);
          document.body.addEventListener("mouseup", onMouseUp, { once: true });
        }}
      >
      </div>
      <div className="w-full flex-1 px-4 pt-2 pb-4 overflow-y-scroll">
        {
          commandHistory.map((command, index) => (
            <CommandRow key={command.command + index} command={command.command} response={command.response} sent={true} />
          ))
        }
        <CommandRow
          key={commandHistory.length}
          command={""}
          autoFocus={true}
          ref={currentRowRef}
          onEnter={(cmd: string) => {
            console.log('execute VMQL: ', cmd);
            setCommandHistory((prevState) => (
              [...prevState, {
                command: cmd,
                response: "ok",
              }]
            ))
          }}
        />
      </div>
    </div>
  )
}
