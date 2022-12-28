import React, { useEffect } from 'react';
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import FormSetCalendar from 'src/components/FormSetCalendar';
import { EVENTS_URL, GAS_URL, SERVICES_URL } from 'src/constants/url';
import { updateEvent, deleteEvent } from 'src/services/EventService';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';
import DeleteDialog from 'src/components/DeleteDialog';
import { IService } from '.';
export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  user_id: number;
  serviceId: number;
  allDay: boolean;
  gasStationId: string;
}

export interface IGasStation {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const ServiceActions = ({ params, rowId, setRowId }) => {
  const [open, setOpen] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [service, setService] = useState<IService>();
  const [gasStation, setGasStation] = useState<IGasStation>();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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

  const { data: servicers } = useSWR<IService[]>(SERVICES_URL, getData);

  const { data: gasStations } = useSWR<IGasStation[]>(GAS_URL, getData);

  const handleOpenEditModal = () => {
    setOpen(true);
    setId(params.id);
  };

  useEffect(() => {
    if (!id || !eventFetch || !servicers || !gasStations) {
      return;
    } else {
      setEvent({
        title: eventFetch.title,
        start: eventFetch.start,
        end: eventFetch.end,
        user_id: eventFetch.user_id
      });
      setIsAllDay(eventFetch.allDay);
      setService(
        servicers.find((servicer) => servicer.id === eventFetch.serviceId)
      );
      setGasStation(
        gasStations.find(
          (gasStation) => gasStation.id == eventFetch.gasStationId
        )
      );

      // const newM= gasStations.findIndex(g=>g.)
      // setGasStation(gasStations.filter(gasStation => gasStation.)
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
      servicerId: service?.id,
      color: 'blue',
      gasStationId: gasStation?.id
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
      setRequesting(false);
    } catch (error) {
      // errorDispatch({
      //   type: ERROR_ACTION.SET_ERROR,
      //   error: error.response.data.message
      // });
      // setRequesting(false);
    }
  };

  const handelDelete = async (params) => {
    await deleteEvent(params.id);
    mutate(EVENTS_URL);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
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
          <IconButton onClick={handleOpenDeleteDialog}>
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
        setService={setService}
        setIsAllDay={setIsAllDay}
        isAllDay={isAllDay}
        requesting={requesting}
        gasStations={gasStations}
        gasStation={gasStation}
        setGasStation={setGasStation}
        service={service}
      />
      <DeleteDialog
        open={openDeleteDialog}
        name="blog"
        handleClose={handleCloseDeleteDialog}
        handleDelete={() => handelDelete(params)}
      />
    </>
  );
};

export default ServiceActions;
