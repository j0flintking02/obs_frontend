import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, refreshToken} from "../redux/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store.ts";
import moment from "moment";
import {CheckIcon} from "@heroicons/react/20/solid";

const navigation = [
    {name: 'Dashboard', href: '/dashboard', current: true},
]
const userNavigation = [
    {name: 'Your Profile', href: '/profile'},
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function MainNavigation() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (authState?.user) {
            const now = moment()
            const expiresIn = moment(authState.tokens.access.expires)
            if (expiresIn.diff(now) < 0) dispatch(refreshToken({refreshToken: authState?.tokens.refresh.token}))
        }
    }, [authState])
    return <>
        <Disclosure as="nav" className="bg-blue-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <h1 className="text-white text-2xl font-bold ">
                                    obs
                                </h1>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-blue-900 text-white'
                                                        : 'text-blue-300 hover:bg-blue-700 hover:text-white',
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
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative mr-3">
                                        <div>
                                            <Menu.Button
                                                className="flex max-w-xs items-center rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={authState?.user.profileImage} alt=""/>
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
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({active}) => (
                                                            <>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-blue-100' : '',
                                                                        'block px-4 py-2 text-sm text-blue-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                                <a
                                                                    onClick={() => dispatch(
                                                                        logout(navigate)).unwrap().then(() => {
                                                                        navigate("/login");
                                                                    })}
                                                                    className={classNames(
                                                                        'hover:bg-blue-500 hover:text-white',
                                                                        'block px-4 py-2 text-sm text-blue-700 cursor-pointer'
                                                                    )}
                                                                >
                                                                    Sign Out
                                                                </a>
                                                            </>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                <div
                                        className="rounded-full bg-blue-300 p-1 text-green-600 text-5xl hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <CheckIcon className="h-4 w-4" aria-hidden="true"/>
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md bg-blue-800 p-2 text-blue-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-blue-900 text-white' : 'text-blue-300 hover:bg-blue-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-blue-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={authState?.user.profileImage} alt=""/>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{authState?.user.name}</div>
                                    <div className="text-sm font-medium leading-none text-blue-400">{authState?.user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto flex-shrink-0 rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-blue-400 hover:bg-blue-700 hover:text-white"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    </>;
}