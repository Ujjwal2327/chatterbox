import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

function PhotoLibrary({ setImage, setShowPhotoLibrary }) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-screen max-w-[100vw] h-full w-full flex justify-center items-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={() => setShowPhotoLibrary(false)}
        >
          <IoClose className="h-10 w-10" />
        </div>

        <div className="grid grid-cols-3 justify-center items-center gap-5 sm:gap-16 p-5 sm:p-20 w-full">
          {images.map((image) => (
            <div
              onClick={() => {
                setImage(image);
                setShowPhotoLibrary(false);
              }}
              key={image}
            >
              <div className="h-20 w-20 sm:h-24 sm:w-24 cursor-pointer relative">
                <Image src={image} alt="avatar" fill sizes="24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
