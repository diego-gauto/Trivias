import React from "react";


const Error = ({ error }: { error: any }) => {
  return error ? (
    <div  >
      {error.message}
    </div>
  ) : (
    <div></div>
  );
};

export default Error;
