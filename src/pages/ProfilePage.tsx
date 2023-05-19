import {PaperClipIcon} from '@heroicons/react/20/solid'
import {Button} from "../components/Button.tsx";
import ProfileModal from "../components/ProfileModal.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../redux/profileSlice.ts";
import {RootState} from "../redux/store.ts";
import moment from "moment";
import {ViewVerificationModal} from "../components/ViewDocumentModal.tsx";

export default function ProfilePage() {
    const [open, setOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    const [viewUrl, setViewUrl] = useState('')
    const authState = useSelector((state: RootState) => state.auth)
    const userProfile = useSelector((state: RootState) => state.profile.data)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authState?.user) {
            dispatch(getUserProfile({
                token: authState.user.tokens.access.token, id: authState.user.user.id
            })).unwrap().then((data) => {
                if (data.message) {
                    alert(data.message)
                }
            })
        }
    }, [])
    return (
        <div className="">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Personal Profile</h1>
                    <div className="flex justify-end">
                        <div className="w-32">
                            <Button style='outline' label="Edit" onClick={() => {
                                setOpen(true)
                            }}/>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mx-36 h-[calc(100vh-200px)]">
                <div className="overflow-scroll h-full">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {userProfile?.profileImage?
                                    <img className="w-32" src={`${userProfile?.profileImage}`}
                                     alt="profile-image"/>:
                                    <img className="w-32" src="https://dummyimage.com/80x60/2d6fcc/fff&text=U"
                                     alt="profile-image"/>}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.gender}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Age</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.age}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.dob?moment(userProfile?.dob).format('Y/M/D'):''}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Marital status</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.maritalStatus}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nationality</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userProfile?.nationality}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Official documents</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                               aria-hidden="true"/>
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span
                                                    className="truncate font-medium">{userProfile?.documentId}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <button onClick={()=>{
                                                    setViewUrl(userProfile?.documentImage)
                                                    setViewOpen(true)}}
                                                   className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    View
                                                </button>
                                            </div>
                                        </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <ProfileModal isOpen={open} handleModal={setOpen} userProfile={userProfile}/>
            <ViewVerificationModal isOpen={viewOpen} handleModal={setViewOpen} url={viewUrl}/>
        </div>
    )
}
