import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {UserCircleIcon} from "@heroicons/react/20/solid";
import {Field, Formik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {imageUpload} from "../redux/imageSlice.ts";
import {updateUserProfile} from "../redux/profileSlice.ts";
import moment from "moment";


export const UploadInput = (props) => {
    const [profileImage, setProfileImage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col mt-2 border border-gray-200 p-4">
            <input
                type="file"
                id="profileImage"
                name={props.field.name}
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 my-4"
                onClick={() => {
                    dispatch(
                        imageUpload(profileImage))
                        .unwrap()
                        .then((data) => {
                            props.setFieldValue(props.field.name, data.url);
                            setIsDisabled(true)
                        })
                }}
                disabled={isDisabled}
            >
                Upload
            </button>
            {props.errorMessage ? (
                <div className="text-red-600">
                    {props.errorMessage}
                </div>
            ) : null}
        </div>
    );
}


export default function ProfileModal({isOpen, handleModal, userProfile}: any) {
    const dispatch = useDispatch()
    const cancelButtonRef = useRef(null)
    const schema = yup.object({
        profileImage: yup
            .string(),
        firstName: yup
            .string(),
        lastName: yup
            .string(),
        dob: yup
            .string()
            .test('dob', 'Should be greater than 18', (value) => {
                return moment().diff(moment(value), "years")
            }),
        nationality: yup
            .string(),
        maritalStatus: yup
            .string(),
    });
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed overflow-y-auto inset-0 z-10">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900">
                                                Edit Details
                                            </Dialog.Title>
                                            <div className="">
                                                <Formik
                                                    validationSchema={schema}
                                                    initialValues={userProfile}
                                                    onSubmit={(data) => {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        dispatch(updateUserProfile({
                                                            profileImage: data.profileImage,
                                                            firstName: data.firstName,
                                                            lastName: data.lastName,
                                                            dob: data.dob,
                                                            age: data.dob ? moment().diff(moment(data.dob), 'years').toString() : '',
                                                            nationality: data.nationality,
                                                            maritalStatus: data.maritalStatus,
                                                            gender: data.gender,
                                                        })).unwrap().then((data) => {
                                                            if (data.message) {
                                                                alert(data.message)
                                                            } else {
                                                                alert(data.message)
                                                            }
                                                        })

                                                    }}>
                                                    {({
                                                          values,
                                                          errors,
                                                          touched,
                                                          handleChange,
                                                          setFieldValue,
                                                          handleBlur,
                                                          handleSubmit,
                                                          isSubmitting
                                                      }) => (
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="space-y-12">
                                                                <div
                                                                    className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                                                    <div className="col-span-full">
                                                                        <div className="mt-2 flex flex-col gap-x-3">
                                                                            {values.profileImage !== '' ?
                                                                                <div
                                                                                    className="flex flex-wrap items-start">
                                                                                    <div
                                                                                        className="w-1/12 sm:w-2/12 px-4">
                                                                                        <img
                                                                                            src={values.profileImage}
                                                                                            alt="..."
                                                                                            className="shadow-lg rounded max-w-full h-auto align-middle border-none"/>
                                                                                    </div>
                                                                                </div> : <UserCircleIcon
                                                                                    className="h-12 w-12 text-gray-300"
                                                                                    aria-hidden="true"/>}

                                                                            <Field
                                                                                name="profileImage"
                                                                                component={UploadInput}
                                                                                title="Upload"
                                                                                setFieldValue={setFieldValue}
                                                                                errorMessage={errors.profileImage ? errors.profileImage : ""}
                                                                                touched={touched.profileImage}
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>
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
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.lastName}
                                                                            />
                                                                            <small
                                                                                className="text-red-600">{errors.lastName && touched.lastName && errors.lastName}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="sm:col-span-full">
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
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                value={values.email}
                                                                                disabled
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-6">
                                                                        <label htmlFor="dob"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Date of Birth
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <input
                                                                                type="date"
                                                                                name="dob"
                                                                                id="dob"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={moment(values.dob).format('YYYY-MM-DD')}
                                                                            />
                                                                            <small
                                                                                className="text-red-600">{errors.dob && touched.dob && errors.dob}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="sm:col-span-6">
                                                                        <label htmlFor="nationality"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Nationality
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <select
                                                                                id="nationality"
                                                                                name="nationality"
                                                                                autoComplete="country-name"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.nationality}
                                                                            >
                                                                                <option>Rwanda</option>
                                                                                <option>Kenya</option>
                                                                                <option>Uganda</option>
                                                                            </select>
                                                                            <small
                                                                                className="text-red-600">{errors.nationality && touched.nationality && errors.nationality}</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-6">
                                                                        <label htmlFor="gender"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Gender
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <select
                                                                                id="gender"
                                                                                name="gender"
                                                                                autoComplete="gender-name"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.gender}
                                                                            >
                                                                                <option>Male</option>
                                                                                <option>Female</option>
                                                                                <option>Choose not to disclose</option>
                                                                            </select>
                                                                            <small
                                                                                className="text-red-600">{errors.gender && touched.gender && errors.gender}</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sm:col-span-6">
                                                                        <label htmlFor="maritalStatus"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Marital Status
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <select
                                                                                id="maritalStatus"
                                                                                name="maritalStatus"
                                                                                autoComplete="gender-name"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                value={values.maritalStatus}
                                                                            >
                                                                                <option>Single</option>
                                                                                <option>Married</option>
                                                                                <option>Divorced</option>
                                                                                <option>Widowed</option>
                                                                                <option>Choose not to disclose</option>
                                                                            </select>
                                                                            <small
                                                                                className="text-red-600">{errors.maritalStatus && touched.maritalStatus && errors.maritalStatus}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    type="submit"
                                                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                >
                                                                    Submit
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => handleModal(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
