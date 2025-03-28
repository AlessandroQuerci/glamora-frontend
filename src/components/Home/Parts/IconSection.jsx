//ICONS
import { SiAwsorganizations } from "react-icons/si";
import { CiTimer } from "react-icons/ci";
import { MdOutlineStorefront } from "react-icons/md";
import { GiEcology } from "react-icons/gi";

const IconSection = () => {
  return (
    <>
      <div className="d-none d-md-flex justify-content-around align-items-center bg-black  p-5 nav-border-bottom">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <SiAwsorganizations className="display-3 display-xl-1  text-white text-center  " />
          <p className="text-center text-white font-navbar fs-6 fs-xl-5 pt-4">ORGANIZZA I CLIENTI</p>
        </div>
        <div className="d-flex flex-column justify-content-center  align-items-center">
          <CiTimer className="display-3 display-xl-1  text-white text-center  " />
          <p className="text-center text-white font-navbar fs-6 fs-xl-5 pt-4">MASSIMIZZA LE TEMPISTICHE</p>
        </div>
        <div className="d-flex flex-column justify-content-center  align-items-center">
          <MdOutlineStorefront className="display-3 display-xl-1  text-white text-center  " />
          <p className="text-center text-white font-navbar fs-6 fs-xl-5 pt-4">MOSTRA LA TUA ATTIVITÀ</p>
        </div>
        <div className="d-flex flex-column justify-content-center  align-items-center">
          <GiEcology className="display-3 display-xl-1  text-white text-center  " />
          <p className="text-center text-white font-navbar fs-6 fs-xl-5 pt-4">AIUTA L'AMBIENTE</p>
        </div>
      </div>
    </>
  );
};

export default IconSection;
