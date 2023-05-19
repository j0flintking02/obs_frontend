export const Button = ({label, disabled, type, onClick, style}:any) => {
    let buttonStyles = 'bg-blue-600 text-white'
    switch (style) {
        case 'outline':
            buttonStyles='text-blue-600 border border-blue-600 hover:text-white hover:border-blue-500'
            break
        default:
            buttonStyles = 'bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'


    }
    return (
        <button
            type={type}
            className={`flex w-full justify-center rounded-md ${buttonStyles}  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-blue-500`}
            disabled={disabled}
			onClick={onClick}
        >
			{label}

        </button>
    )
}