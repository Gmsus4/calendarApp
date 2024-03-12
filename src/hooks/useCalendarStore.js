import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
   const dispatch = useDispatch(); 
   const { events, activeEvent } = useSelector(state => state.calendar);
   const { user } = useSelector(state => state.auth);

   const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
   }

   const startSavingEvent = async( calendarEvent ) => {
      //TODO: Update event
      if(calendarEvent._id){
        //Actualizando
        dispatch(onUpdateEvent({...calendarEvent}));
      } else{
        //Creando
        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log({data});

        dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user: user}));
      }
   }

   const startDeletingeEvent = () => {
    //Todo llegar al backend
      dispatch(onDeleteEvent());
   }

   const startLoadingEvents = async() => {
      try {
        const { data } = await calendarApi.get('/events');
        const events = convertEventsToDateEvents( data.eventos );
        dispatch(onLoadEvents( events ))
        console.log(events);
      } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
      }
   }

  return {
    //* Propiedades
    activeEvent,
    events, 
    hasEventSelected: !!activeEvent,

    //*Metodos
    setActiveEvent,
    startDeletingeEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
