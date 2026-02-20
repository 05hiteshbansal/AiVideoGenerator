"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Player } from "@remotion/player";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import { RemotionRoot } from "../../../remotion/Root";

const PlayerModal = ({ data, open, setData, setOpen }) => {
  const [durationValue, setDurationValue] = useState(100);

  useEffect(() => {
    if (!data?.scripts || data.scripts.length === 0) return;

    const lastScript = data.scripts[data.scripts.length - 1];
    const calculatedDuration =
      Math.round((lastScript.end / 1000) * 30 + 20) || 100;

    setDurationValue(calculatedDuration);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setData({ images: [], audioUrl: "", scripts: [] });
  };

  const handleExport = async () => {
    try {
      await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exportvideo`,
        { data },
      );
    } catch (error) {
      console.error("Failed to export video", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={open}
        size="lg"
        backdrop="blur"
        hideCloseButton
        isDismissable={false}
        isKeyboardDismissDisabled={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Video generated
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center bg-black">
                  {data && (
                    <Player
                      component={VideoPlayer}
                      durationInFrames={durationValue || 100}
                      compositionWidth={300}
                      compositionHeight={450}
                      fps={30}
                      controls
                      inputProps={{ ...data }}
                    />
                  )}
                  {data && <RemotionRoot data={data} />}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Clear
                </Button>
                <Button color="primary" onPress={handleExport}>
                  Export
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayerModal;
