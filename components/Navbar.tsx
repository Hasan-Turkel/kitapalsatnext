"use client";

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { tokenAtom, newMessageAtom } from "../utils/atoms";
import useAuth from "../utils/useAuth";
import useMessages from "../utils/useMessages";
import { useEffect } from "react";

const navigation = [{ name: "İkinciElKitapAlSat", href: "/" }];

const Navbar = () => {
  const user = useAtomValue(tokenAtom);
  const newMessage = useAtomValue(newMessageAtom);
  const { logout } = useAuth();
  const { isNewMessage } = useMessages();

  useEffect(() => {
    user && isNewMessage();
  }, [user, newMessage]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex flex-1 sm:items-stretch sm:justify-start">
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white text-xl"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="/user.png"
                      className="h-8 w-8 rounded-full"
                    />

                    {newMessage && (
                      <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/profilim"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Profilim
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/ilanlarim"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      İlanlarım
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/mesajlarim"
                      className="  block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Mesajlarım{" "}
                      {newMessage && (
                        <span className="text-xs text-red-500">
                          (Yeni Mesaj)
                        </span>
                      )}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <p
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      onClick={() => logout()}
                    >
                      Çıkış Yap
                    </p>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex gap-3 text-white">
                <Link
                  href={"/login"}
                  className="hover:underline "
                  role="button"
                >
                  Giriş Yap
                </Link>
                <p> / </p>
                <Link
                  href={"register"}
                  className="hover:underline"
                  role="button"
                >
                  Üye Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
