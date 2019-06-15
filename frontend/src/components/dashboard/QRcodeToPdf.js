import React from "react";
import Pdf from "react-to-pdf";
import UserQRcodes from "../users/UserQRcodes";
import RoomQRcodes from "../rooms/RoomQRcodes";

const ref = React.createRef();

const QRcodeToPdf = () => {
  return (
    <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
        <UserQRcodes />
		<RoomQRcodes />
      </div>
    </div>
  );
}

export default QRcodeToPdf;
