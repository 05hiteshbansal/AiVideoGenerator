import React,{useEffect, useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Image from 'next/image';
import icon from '@/media/loadingicon.gif';
    const Loading=({load})=>{
  return (
    <>
      <Modal isOpen={load}
      hideCloseButton={true}
       isDismissable={false} isKeyboardDismissDisabled={false}>
        <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader className=" text-black text-center font-ubuntu font-bold text-xl">Loading ....</ModalHeader>
              <ModalBody>
               <div className=' w-full h-64 relative '>
                <Image
                src={icon}
                fill
                alt='image'
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
               </div>
              </ModalBody>
              </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}

export default Loading