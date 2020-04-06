import { FETCH_EVENTS } from '../actions/types';


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EVENTS :
      let events = []
      action.payload.forEach(data => {

          let newEvent = {
              title: data.title,
              startDate: data.startDate,
              endDate: data.endDate,
              rRule: data.recurrenceRule,
          }
          console.log('newEvent', newEvent)

          events.push(newEvent)
       })
       return events
    default:
      return state
  }
}