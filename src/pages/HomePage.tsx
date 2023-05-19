import StatusBanner from "../components/StatusBanner.tsx";
// import {useDispatch, useSelector} from "react-redux";
// import {decrement, increment, incrementAsync} from "../redux/imageSlice.ts";
// import {RootState} from "../redux/store.ts";

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

        {/*                <div>*/}
        {/*                    <button*/}
        {/*                        aria-label="Increment value"*/}
        {/*                        onClick={() => dispatch(increment())}*/}
        {/*                    >*/}
        {/*                        Increment*/}
        {/*                    </button>*/}
        {/*                    <span>{count}</span>*/}
        {/*                    <button*/}
        {/*                        aria-label="Decrement value"*/}
        {/*                        onClick={() => dispatch(decrement())}*/}
        {/*                    >*/}
        {/*                        Decrement*/}
        {/*                    </button>*/}
        {/*                    <button*/}
        {/*  onClick={() => dispatch(incrementAsync( 90))}*/}
        {/*>*/}
        {/*  Add Async*/}
        {/*</button>*/}
        {/*                </div>*/}
                    </div>
                </main>
            </div>
        </>
    )
}
