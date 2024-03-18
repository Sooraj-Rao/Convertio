"use client";
import React, { useEffect, useRef, useState } from "react";
import { extensions } from "../utils/helper";
import { Action } from "@/types";
import { accepted_files } from "../utils/helper";
import { MdClose } from "react-icons/md";
import ReactDropzone from "react-dropzone";
import fileToIcon from "@/utils/file_to_icon";
import compressFileName from "@/utils/compress-file-name";
import bytesToSize from "@/utils/bytes-to-size";
import { Badge } from "./ui/badge";
import { BiError } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import { LuFileSymlink } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { HiOutlineDownload } from "react-icons/hi";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { FiUploadCloud } from "react-icons/fi";
import loadFfmpeg from "@/utils/load-ffmpeg";
import convertFile from "@/utils/convert";

const Dropzone = () => {
  const { toast } = useToast();
  const [is_hover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const [defaultValues, setDefaultValues] = useState<string>("video");
  const [selcted, setSelected] = useState<string>("...");

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const downloadAll = (): void => {
    for (let action of actions) {
      !action.is_error && download(action);
    }
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const convert = async (): Promise<any> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const handleUpload = (data: Array<any>): void => {
    handleExitHover();
    setFiles(data);
    const tmp: Action[] = [];
    data.forEach((file: any) => {
      const formData = new FormData();
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    setActions(tmp);
  };

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  const updateAction = (file_name: String, to: String) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          // console.log("FOUND");
          return {
            ...action,
            to,
          };
        }

        return action;
      })
    );
  };

  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);
  useEffect(() => {
    load();
  }, []);

  if (actions.length) {
    return (
      <div className="space-y-6 sm:px-10 mx-2 overflow-scroll  text-wrap">
        {actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!is_loaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-slate-900">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex items-start flex-col  gap-1 w-96">
                <span className="text-md  font-medium overflow-x-hidden">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-gray-600 text-xs">
                  ({bytesToSize(action.file_size)})
                </span>
              </div>
            </div>

            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Converting File</span>
                <BiError />
              </Badge>
            ) : action.is_converted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Done</span>
                <MdDone />
              </Badge>
            ) : action.is_converting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </Badge>
            ) : (
              <div className="text-gray-600  sm:pt-0 pt-5 text-md flex items-center justify-between  sm:w-1/2 w-full  gap-4">
                <span>Convert to</span>
                <Select
                  onValueChange={(value) => {
                    if (extensions.audio.includes(value)) {
                      setDefaultValues("audio");
                    } else if (extensions.video.includes(value)) {
                      setDefaultValues("video");
                    }
                    setSelected(value);
                    updateAction(action.file_name, value);
                  }}
                  value={selcted}
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 border-2 border-gray-400 text-center text-gray-600 bg-gray-50 text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit  ">
                    {action.file_type.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit ">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes("video") && (
                      <Tabs defaultValue={defaultValues} className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.file_type.includes("audio") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
            <span
              onClick={() => deleteAction(action)}
              className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl hover:text-gray-700 text-gray-400"
            >
              <MdClose />
            </span>
              </div>
            )}
          </div>
        ))}
        <div className="flex w-full justify-center">
          {is_done ? (
            <div className=" gap-x-5 gap-y-5  flex items-center sm:flex-row flex-col justify-between">
              <Button
                size="lg"
                className="rounded-xl  font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4  text-md  flex gap-2 items-center w-full"
                onClick={reset}
              >
                Convert Another File
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!is_ready || is_converting}
              className="rounded font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {is_converting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className=" flex justify-center sm:p-0 p-4">
          <div
            {...getRootProps()}
            className="  sm:h-72 sm:w-96 h-40 w-[90%]   lg:h-60 sm:shadow-xl shadow-none sm:shadow-slate-700   sm:border-2 border-dashed cursor-pointer flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <div className="space-y-4 text-gray-500">
              {is_hover ? (
                <>
                  <div className="justify-center flex text-6xl">
                    <LuFileSymlink />
                  </div>
                  <h3 className="text-center font-medium text-2xl">
                    Yes, right there
                  </h3>
                </>
              ) : (
                <>
                  <div className="justify-center hidden  sm:flex sm:text-6xl text-3xl">
                    <FiUploadCloud />
                  </div>
                  <h3 className="text-center sm:block hidden font-medium sm:text-2xl text-sm">
                    Click, or drop your files here
                  </h3>
                  <Button
                    className=" sm:hidden px-12 py-7 text-lg"
                    variant={"default"}
                  >
                    Upload
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
