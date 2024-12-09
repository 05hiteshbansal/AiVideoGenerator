"use client";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import EmptyVideo from "@/components/dashboard/EmptyVideo";
import axios from "axios";
import { useRouter } from "next/navigation";
import VideoPlayer from "@/components/Player/VideoPlayer";
import { Player } from "@remotion/player";
import { Thumbnail } from "@remotion/player";
import PlayerModel from "@/components/Player/Player";
const page = () => {
  const router = useRouter();
  const [videolist, setVideolist] = useState([]);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState({
    images: [],
    audioUrl: "",
    scripts: [],
  });
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getVideos`
      );
      console.log(data.data.message);
      setVideolist(data.data.message);
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    console.log(test);
  }, [test]);

  const playVideo = (video) => {
    console.log(video);
    setTest(video);

    setOpen(true);
  };
  return (
    <div>
      <div className=" flex justify-between p-5 ">
        <div className=" font-ubuntu text-purple-600 text-2xl font-bold  ">
          Dashboard
        </div>
        <Button className="  bg-purple-500 font-ubuntu text-white" href="/new">
          <PlusIcon className=" size-4  text-white" /> Create New{" "}
        </Button>
      </div>
      {videolist.length === 0 ? <EmptyVideo /> : <div>Videos</div>}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {videolist.map((video) => (
          <div key={video.id} onClick={() => playVideo(video)}>
            <Thumbnail
              component={VideoPlayer}
              compositionWidth={300}
              compositionHeight={450}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              inputProps={{
                ...video,
                setDurationValue: (v) => {
                  //console.log(v);
                },
              }}
            />
          </div>
        ))}
        {open && <PlayerModel data={test} open={open} setData={setTest} setOpen={setOpen}/>}
      </div>
    </div>
  );
};

export default page;
