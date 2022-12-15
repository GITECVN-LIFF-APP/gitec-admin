import React, { useEffect } from 'react';
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import FormSetCalendar from 'src/components/FormSetCalendar';
import { EVENTS_URL } from 'src/constants/url';
import { updateEvent } from 'src/services/EventService';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';
// import DeleteDialog from '../DeleteDialog';
// import { deleteCategory } from 'src/services/CategoryService';
interface IEvent {
  title: string;
  start: string;
  end: string;
  user_id: number;
  type: string;
  allDay: boolean;
}

const ServiceActions = ({ params, rowId, setRowId }) => {
  const [open, setOpen] = useState(false);
  const [servicers, setServicers] = useState(['Clean', 'Polish']);
  const [isAllDay, setIsAllDay] = useState(false);
  const [type, setType] = useState('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [event, setEvent] = useState({
    title: '',
    start: '',
    end: '',
    user_id: 1
  });
  const [id, setId] = useState<number>();

  const { data: eventFetch } = useSWR<IEvent>(
    id ? EVENTS_URL + id : null,
    getData
  );
  console.log(eventFetch, event);
  const handleOpenEditModal = () => {
    setOpen(true);
    setId(params.id);
  };

  useEffect(() => {
    if (!id || !eventFetch) {
      return;
    } else {
      setEvent({
        title: eventFetch.title,
        start: eventFetch.start,
        end: eventFetch.end,
        user_id: eventFetch.user_id
      });
      setIsAllDay(eventFetch.allDay);
      setType(eventFetch.type);
    }
  }, [eventFetch, id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setEvent({
      ...event,
      [e.target.name]: value
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...event,
      allDay: isAllDay,
      type: type,
      color: 'blue'
    };
    try {
      const response = await updateEvent(data, id);
      setRequesting(true);
      setIsAllDay(false);
      // successDispatch({
      //   type: SUCCESS_ACTION.SET_SUCCESS,
      //   success: 'Create Article Success'
      // });
      mutate(EVENTS_URL);
      setOpen(false);
      setEvent({
        title: '',
        start: '',
        end: '',
        user_id: 1
      });
      setType('');
      setRequesting(false);
    } catch (error) {
      // errorDispatch({
      //   type: ERROR_ACTION.SET_ERROR,
      //   error: error.response.data.message
      // });
      // setRequesting(false);
    }
  };

  return (
    <>
      <Box>
        <Tooltip title="Chỉnh sửa danh mục này">
          <IconButton onClick={handleOpenEditModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa danh mục này">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <FormSetCalendar
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        event={event}
        handleChange={handleChange}
        servicers={servicers}
        setType={setType}
        setIsAllDay={setIsAllDay}
        isAllDay={isAllDay}
        requesting={requesting}
      />
    </>
  );
};

export default ServiceActions;
