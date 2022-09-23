import { Disclosure } from "@headlessui/react";
import { createContext, FC, useContext, useMemo, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Topography from "./topography.svg";
import { useAddress, useAuthenticator } from "./Authenticator";
import Title from "./Title";
// import Client from "./client/Client";
// import Expert from "./expert/Expert";
// import Arbiter from "./arbiter/Arbiter";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const mainContext = createContext({
  title: "Dashboard",
  setTitle: (title: string) => {},
});
const { Provider: MainProvider } = mainContext;
export const useMain = () => useContext(mainContext);

const Main: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Disambiguate />} />
      {/* <Route path="/client" element={<Client />} />
      <Route path="/expert" element={<Expert />} />
      <Route path="/arbiter" element={<Arbiter />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const Disambiguate: FC = () => {
  return (
    <div className="w-full h-full bg-green-500">
      <Title />
    </div>
  );
};

export default Main;
