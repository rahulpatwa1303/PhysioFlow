import BellIcon from "@/assests/icon/BellIcon";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Bell, BrainCircuit } from "lucide-react";
import { useEffect, useState, Fragment } from "react";

function NotificationComponent() {
  const [notification, setNotification] = useState([]);

  const fetchNotification = async () => {
    await axios("/api/notification").then((resp) => setNotification(resp.data));
  };

  useEffect(() => {
    fetchNotification();
    const interval = setInterval(() => {
      fetchNotification();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const whichIcon = {
    ai: <BrainCircuit />,
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md">
            {!notification.length ? <Bell size={20} /> : <BellIcon />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              {notification.length ? (
                notification.map((notify, index) => (
                  <div key={`${notify.type.title}-${index}`}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-sky-500/30" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-4`}
                        >
                          {whichIcon[notify.type.catagory]}
                          <div className="flex flex-col justify-start w-full items-start">
                            <a className="text-md">{notify.type.title}</a>
                            <a className="text-xs text-gray-500">
                              {notify.message}
                            </a>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                    {index !== notification.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <p className="uppercase font-xl font-bold">no notification</p>
                  <hr className="h-[2px] bg-gray-100/10 w-full rounded-md" />
                  <p className="text-sm text-center">
                    We'll notify you when there is something new
                  </p>
                </div>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default NotificationComponent;
