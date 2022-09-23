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
import Logo from "./logo.png";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Topography from "./topography.svg";
import { useAddress, useAuthenticator } from "./Authenticator";
import Client from "./client/Client";
import Expert from "./expert/Expert";
import Arbiter from "./arbiter/Arbiter";

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
  const { logout } = useAuthenticator();
  const address = useAddress();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigation = useMemo(() => {
    return [
      {
        name: "Contracts",
        to: "/",
        current: !pathname.startsWith("/template"),
      },
      {
        name: "Templates",
        to: "/template",
        current: pathname.startsWith("/template"),
      },
      // {
      //   name: "Contract",
      //   to: "/contract",
      //   current: pathname.startsWith("/contract"),
      // },
    ];
  }, [pathname]);

  const [title, setTitle] = useState("Dashboard");
  const value = useMemo(() => ({ title, setTitle }), [title]);
  return (
    <div>
      <div
        className="fixed w-screen h-screen"
        style={{ background: `url(${Topography})` }}
      />
      <div className="relative  mx-auto flex flex-col h-screen">
        {/* <Fragment>
      <div className="min-h-screen bg-purple-200"> */}
        <div className="py-2">
          <header>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <h1 className="text-4xl font-bold leading-tight text-primary-default mt-2">
                {title}
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">
                <MainProvider value={value}>
                  <SubMain />
                </MainProvider>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const SubMain: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/client" element={<Client />} />
      <Route path="/expert" element={<Expert />} />
      <Route path="/arbiter" element={<Arbiter />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Main;
