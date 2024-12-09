"use Client";
import React,{useEffect, useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Player} from '@remotion/player';
import VideoPlayer from './VideoPlayer';

const PlayerModel = ({data, open , setData, setOpen}) => {
  const [durationValue,setDurationValue]=useState(100);
  const handleclose=()=>{
    setOpen(false);
    setData({images: [],
      audioUrl: "",
      scripts:[]});
  }
  const handleExport = async (e) => {
       console.log("exported")
  };


  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Modal isOpen={open}
      hideCloseButton={true}
       isDismissable={false} isKeyboardDismissDisabled={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Video Generated</ModalHeader>
              <ModalBody>
               <div className=' flex items-center justify-center bg-black '>
              <Player
    component={VideoPlayer}
    durationInFrames={Number(durationValue.toFixed(0))}
    compositionWidth={300}
    compositionHeight={450}
    fps={30}
    controls={true}
    inputProps={{
      ...data,
      setDurationValue:(frame)=>setDurationValue(frame)
    }
    }
  />
               </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" 
                onPress={handleclose}
                >
                  Clear
                </Button>
                <Button color="primary" 
                onPress={handleExport}>
                  Export
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


    </>

  )
}

export default PlayerModel