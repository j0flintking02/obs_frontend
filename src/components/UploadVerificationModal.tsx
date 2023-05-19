import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useRef, useState} from 'react'
import {Field, Formik} from "formik";
import {UploadInput} from "./ProfileModal.tsx";
import {useDispatch} from "react-redux";
import {updateUserProfile} from "../redux/profileSlice.ts";
import * as yup from "yup";

export function UploadVerificationModal({isOpen, handleModal}) {
    const dispatch = useDispatch()
    const schema = yup.object({
        documentId: yup
            .string()
            .required('Please Enter your ID number'),
        documentImage: yup
            .string()
            .required('Please upload your document'),
    });
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Verification Data
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Formik validationSchema={schema} initialValues={{
                                        documentId: '',
                                        documentImage: ''
                                    }} onSubmit={(data) => {
                                        dispatch(updateUserProfile(data)).unwrap().then((data) => {
                                            console.log(data)
                                            if (data.message) {
                                                alert(data.message)
                                            } else {
                                                alert("Your information has been sent successfully")
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
                                                <div className="sm:col-span-6">
                                                    <label htmlFor="documentId"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Document number.
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="documentId"
                                                            id="documentId"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.documentId}
                                                        />
                                                        <small
                                                            className="text-red-600">{errors.documentId && touched.documentId && errors.documentId}</small>
                                                    </div>
                                                    <div>
                                                        <Field
                                                            name="documentImage"
                                                            component={UploadInput}
                                                            title="Document image"
                                                            setFieldValue={setFieldValue}
                                                            errorMessage={errors.documentImage ? errors.documentImage : ""}
                                                            touched={touched.documentImage}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}