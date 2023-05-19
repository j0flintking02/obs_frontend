import StatusBanner from "../components/StatusBanner.tsx";
import {ArrowUpCircleIcon} from "@heroicons/react/20/solid";
import {UploadVerificationModal} from "../components/UploadVerificationModal.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {getUserProfile} from "../redux/profileSlice.ts";

export default function HomePage() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const authState = useSelector((state: RootState) => state.auth)
    let content = <></>
    switch (authState.user?.user.verificationStatus) {
        case 'UNVERIFIED':
            content = <div className="">
                <p className="text-gray-600 pb-3">Documents for approval</p>
                <div className="flex justify-center">
                    <button
                        className="inline-flex justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md mx-2"
                        onClick={() => setOpen(true)}>
                        <ArrowUpCircleIcon className="h-6 w-6 flex-shrink-0 text-white pr-2"
                                           aria-hidden="true"/>
                        Submit
                    </button>
                </div>
            </div>
            break
        case 'PENDING VERIFICATION':
            content = <div className="flex justify-center">
                <button
                    className="inline-flex justify-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md mx-2"
                    onClick={() => {
                        console.log(authState)
                        dispatch(getUserProfile({
                            token: authState.user.tokens.access.token, id: authState.user.user.id
                        })).unwrap().then((data) => {
                            if (data.message) {
                                alert(data.message)
                            }
                        })
                    }}>
                    Check
                </button>
            </div>
            break
        case 'VERIFIED':
            content = <div>Welcome</div>
            break
        default:
            content = <div>Something went wrong</div>
    }
    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <StatusBanner user={authState.user}/>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div
                            className="w-full h-96 border border-2 border-gray-500 border-dashed rounded flex justify-center items-center">
                            {content}
                        </div>
                    </div>
                </main>
            </div>
            <UploadVerificationModal isOpen={open} handleModal={setOpen}/>
        </>
    )
}
