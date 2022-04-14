import React from "react";

import image from "./cooking.png";

export default function NotFound () {
  return (
    <div>
      <h1>Error 404 Page Not Found</h1>
      <img src={image} alt="" />
    </div>
  );
}