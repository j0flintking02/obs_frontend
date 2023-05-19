import reset_password_image from "../assets/undraw_my_password_re_ydq7.svg";
import {handleResetPassword} from "../redux/authSlice.ts";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {redirect, useNavigate, useSearchParams} from "react-router-dom";

export default function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const schema = yup.object({
        password: yup
            .string()
            .required(),
        confirmPassword: yup
            .string(),
    });
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="my-16">
                        <img className="h-52" src={reset_password_image} alt="logo"/>
                    </div>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }} onSubmit={(data) => {
                        const {password} = data
                        dispatch(handleResetPassword({password, token})).unwrap().then((data) => {
                            if (data === 204) navigate("/login");
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
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        <small
                                            className="text-red-600">{errors.password && touched.password && errors.password}</small>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                        />
                                        <small
                                            className="text-red-600">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</small>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Reset password
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
