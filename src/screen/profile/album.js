import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Album(props) {
  const { album } = useSelector((state) => state);
  const AlbumList = Object.values(album.albums).filter(
    (item) => item.userId === Number(props.userId)
  );
  return (
    <div>
      {AlbumList.map((item) => (
        <div>
          <Link to={`/album/${item.id}`}>
            <div
              key={item.id}
              className="hover:bg-gray-200 cursor-pointer p-2 rounded-md"
            >
              {item.title}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
