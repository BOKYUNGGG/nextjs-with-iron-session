'use client'


type DropdownHoverProps = {
    hoverText : string;
    children : React.ReactNode
}
export function DropdownHover(props : DropdownHoverProps){

    return(
        <div className="group block p-4 rounded-lg">
            <div className="">
                <h3 className="inline">{props.hoverText}</h3>
                <svg opacity="0.5" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="inline">
                    <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                </svg>
            </div>
            {props.children}
        </div>
    )
}