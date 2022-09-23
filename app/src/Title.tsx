import { FC, Fragment } from "react";
import Logo from "./logo.png";
const Title: FC = () => {
  return (
    <Fragment>
      <div className="flex items-center space-x-12">
        <img src={Logo} alt="Logo" className="w-28" />
        <h1 className="text-[96px] font-bold text-primary-default">PolyGig</h1>
      </div>
    </Fragment>
  );
};
export default Title;
