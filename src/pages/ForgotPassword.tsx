import forgot_password_image from "../assets/undraw_forgot_password_re_hxwm.svg";
import {useDispatch} from "react-redux";
import {handleForgotPassword} from "../redux/authSlice.ts";
import {Formik} from "formik";

export default function ForgotPassword() {
    const dispatch = useDispatch()
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="my-16">
                        <img className="h-52" src={forgot_password_image} alt="logo"/>
                    </div>
                    <Formik initialValues={{
                        email: ''
                    }} onSubmit={(data) => {
                        const {email} = data
                        dispatch(handleForgotPassword({email})).unwrap().then((data) => {
                            if (data === 204) alert('Sent Successfully')
                        })
                    }}>
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <small
                                            className="text-red-600">{errors.email && touched.email && errors.email}</small>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Send Link
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        In case we find your email we shall send a reset link
                    </p>
                </div>
            </div>
        </>
    )
}
