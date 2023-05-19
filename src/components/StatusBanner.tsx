import { XMarkIcon } from '@heroicons/react/20/solid'

export default function StatusBanner(props) {
    let bgColor = ''
    let message = ''
    const status:any = 'verified'
    switch (status){
        case 'pending':
            bgColor = 'bg-red-50'
            message = 'Please submit your documents for approval'
            break
        case 'under_review':
            bgColor = 'bg-amber-50'
            message = 'Documents are still under review'
            break
        case 'verified':
            bgColor = 'bg-green-50'
            message = 'Documents have been approved'
            break
    }
  return (
    <div className={`relative isolate flex items-center gap-x-6 overflow-hidden ${bgColor} px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">Status Update</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
            {message}
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}