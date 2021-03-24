/*
    MonetizedRouter
    
    The monetized router is responsible for using local state to determine which state view is rendered
*/

import React, { useEffect, useState } from 'react'
import { PopupProps } from '../../types'
import { MonetizedDonatingView } from './MonetizedDonatingView'
import { MonetizedRateLimitedView } from './MonetizedRateLimitedView'

//
// Component
//
export const MonetizedRouter = (props: PopupProps) => {
    const { context } = props
    const [limitRefreshDate, setLimitRefreshDate] = useState<string | null>(null)
 
    useEffect(() => {
        props.context.runtime.sendMessage(
        {
            command: 'isRateLimited'
        },
        result => {
            if (result && result.limitExceeded) {
            const date = new Date(result.limitRefreshDate)
            const formatted = date.toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
            setLimitRefreshDate(formatted)
            }
        }
        )
    }, [])

    if(limitRefreshDate != null ){
        // Show the Rate limited view
        return(
            <MonetizedRateLimitedView context={context} limitRefreshDate={limitRefreshDate}/>
        )
    } else {
        // Show the donating view
        return(
            <MonetizedDonatingView context={context}/>
        )
    }
}