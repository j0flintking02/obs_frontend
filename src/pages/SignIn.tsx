import side_image from '../assets/undraw_mobile_login_re_9ntv.svg';
import {Formik} from 'formik';
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../redux/authSlice.ts";
import {useDispatch} from "react-redux";

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required('Please Enter your Email'),
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div className="flex h-screen">
            <div className="hidden sm:block flex-1 bg-blue-700">
                <div className="flex w-full h-full justify-center items-center">
                    <img className="h-52" src={side_image} alt="logo"/>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="text-center text-3xl font-bold leading-9 text-blue-600">obs</h1>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Formik
                            validationSchema={schema}
                            initialValues={{email: '', password: ''}}
                            onSubmit={(values, formikHelpers) => {
                                dispatch(loginUser({
                                    email: values.email,
                                    password: values.password
                                })).unwrap().then((data) => {
                                    if (data.message) {
                                        alert(data.message)
                                    } else if (!data.user.isEmailVerified){
                                        alert('Please verify your email')
                                    }else {
                                        navigate("/profile");
                                    }
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
                                <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
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
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="text-sm">
                                                <a href="/forgot-password"
                                                   className="font-semibold text-blue-600 hover:text-blue-500">
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>
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
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Sign in

                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                Create an account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
