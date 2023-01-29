import { format, formatDistance, formatRelative, subDays } from 'date-fns'


export const sinceDate = (dateString) => {
    if(!dateString) return ''
    const date = new Date(dateString)
    return formatDistance(date, new Date(), { addSuffix: true})
}