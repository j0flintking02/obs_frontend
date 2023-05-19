import {useNavigate} from "react-router-dom";
import side_image from '../assets/undraw_account_re_o7id.svg';
import {loginUser, registerUser, sendVerification} from "../redux/authSlice.ts";
import {Formik} from 'formik';
import * as yup from "yup";
import {useDispatch} from "react-redux";

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const handleSubmit = (e:any)=>{
    //     e.preventDefault()
    //     navigate("/verify-account", );
    // }

    const schema = yup.object({

        firstName: yup
            .string()
            .required('Please Enter your First Name'),
        lastName: yup
            .string()
            .required('Please Enter your Last Name'),
        email: yup
            .string()
            .email()
            .required('Please Enter your Email'),
        password: yup
            .string()
            .required('Please Enter your password'),
        confirmPassword: yup
            .string()
            .required('Please Enter your password'),
    });

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
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Welcome to obs
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                        <Formik
                            validationSchema={schema}
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            onSubmit={(values) => {
                                const {
                                    firstName,
                                    lastName,
                                    email,
                                    password
                                } = values
                                dispatch(registerUser({
                                    name: `${firstName} ${lastName}`,
                                    email,
                                    password
                                })).unwrap().then((data) => {
                                    if (data.message) {
                                        alert(data.message)
                                    } else {
                                        dispatch(sendVerification({
                                            email: data.user.email,
                                            token: data.tokens.access.token
                                        })).unwrap().then((data) => {
                                            if (data === 204) alert('A verification link has been sent to your email')
                                        })
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
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <div className="sm:col-span-6">
                                            <label htmlFor="firstName"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstName}
                                                />
                                                <small
                                                    className="text-red-600">{errors.firstName && touched.firstName && errors.firstName}</small>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="lastName"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                />
                                                <small
                                                    className="text-red-600">{errors.lastName && touched.lastName && errors.lastName}</small>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-12">
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
                                        <div className="sm:col-span-12">
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
                                        <div className="sm:col-span-12">
                                            <label htmlFor="confirmPassword"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
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
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <a href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                login to your account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}