'use client';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import Cookies from "js-cookie";
// Type for navigation items
type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};
// Navigation items list
const navigation: NavigationItem[] = [
];
// Helper function for classNames
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
// Main Navbar component
export default function Navbar() {
  const router = useRouter();
  function logOut() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("id_token");
    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}logout?response_type=code&client_id=${process.env.NEXT_PUBLIC_AWS_USERPOOL_WEB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL}&state=STATE&scope=email+openid+profile+aws.cognito.signin.user.admin`;
    router.push('/');
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          {/* Logo Section */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
            <div className="flex-shrink-0 ">
              <Image height={32} width={32}
                className="h-8 w-auto rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDuVU7178tFud9R3XENX5_DHfLbQoU6SHCQ&s"
                alt="Company Logo"
              />
            </div>
            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Notification and Profile Section */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">View notifications</span>
            </button> */}
            {/* Profile Dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full border-red-900 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <Image height={32} width={32}
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://d26m3nkliijtj5.cloudfront.net/uataqa-resources/images/profile-images/0.png"
                    alt="User profile"
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item> */}
                {/* <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <a onClick={logOut}
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Panel */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
