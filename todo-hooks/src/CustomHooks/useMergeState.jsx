import React from 'react'

export const useMergeState = (initialState) => {
    

    const [state, updateState] = React.useState( initialState )

    const setState = (partialState) => {
        updateState({...state, ...partialState})
    }


    return [state,setState]
}
