import React from 'react'


export const TodoHeader = ({text,color,bgColor}) => {
    return (
        <>
            <p style = {{ backgroundColor:bgColor, border:`2px solid ${color}`,textAlign:'center'}}>
                {text}
            </p>
            
        </>
    )
}
