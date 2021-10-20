import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Navbar from "../../components/navbar";

export default function Index() {
  const { albumId } = useParams();
  const { album } = useSelector((state) => state);
  const albumData = album?.albums[albumId] || [];

  return (
    <div className="w-full">
      <Navbar />
      <div className=" mt-4 flex items-center justify-center">
        <div className="w-11/12 bg-white p-4 rounded-md">
          <h1 className="text-xl text-center mb-4">{albumData?.title}</h1>
          <div className="grid grid-cols-3 gap-4">
            {albumData?.photos?.map((item) => (
              <di key={item.id} v>
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full"
                />
                <div className="text-center">{item.title}</div>
              </di>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
