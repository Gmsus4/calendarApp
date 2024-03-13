import { useCalendarStore, useUiStore } from '../../hooks'

export const FabDelete = () => {
  const { startDeletingeEvent, hasEventSelected, activeEvent } = useCalendarStore();

  const handleDelete = () => {
    startDeletingeEvent();
  }
  return (
    <button
        className='btn btn-danger fab-danger' 
        onClick={ handleDelete }
        style={{
          display: hasEventSelected ? '' : 'none'
        }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
