import StatusBanner from "../components/StatusBanner.tsx";
import {PaperClipIcon, ArrowUpCircleIcon} from "@heroicons/react/20/solid";

export default function HomePage() {
    // const count = useSelector((state: RootState) => state.counter.value)
    // const dispatch = useDispatch()
    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <StatusBanner/>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className="w-full h-96 border border-2 border-gray-500 border-dashed rounded flex justify-center items-center">
                            <div className="">
                                <p className="text-gray-600 pb-3">Documents for approval</p>
                                <div className="flex justify-center">
                                    <button
                                    className="inline-flex justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md mx-2">
                                        <ArrowUpCircleIcon className="h-6 w-6 flex-shrink-0 text-white pr-2"
                                                               aria-hidden="true"/>
                                    Submit
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
