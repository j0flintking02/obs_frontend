import verify from "../../assets/undraw_two_factor_authentication_namy.svg";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {verifyAccount} from "../../redux/authSlice.ts";

export default function VerifyRegister() {
  const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
      dispatch(verifyAccount(token)).unwrap().then((data)=>{
        if (data === 204) navigate('/login')
      })
    },[])
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex w-full h-full justify-center items-center">
          <img className="h-52" src={verify} alt="logo"/>
        </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Verifying your Account</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">This will help verify that you are using the correct email.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/register"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}