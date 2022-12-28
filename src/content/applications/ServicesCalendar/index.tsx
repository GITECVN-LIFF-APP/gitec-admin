import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import { EVENTS_URL, GAS_URL, SERVICES_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';
import ServiceTable from './ServiceTable';
import { useState } from 'react';
import FormSetCalendar from 'src/components/FormSetCalendar';
import { createEvent } from 'src/services/EventService';
import { useTranslation } from 'react-i18next';
import { IEvent, IGasStation } from './ServiceActions';
export interface IService {
  name: string;
  id: number;
  price: string;
}
export interface IEventState {
  title: string;
  start: string;
  end: string;
  user_id: number;
}

function ApplicationsTransactions() {
  const { t } = useTranslation();
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [service, setService] = useState<IService>();
  const [gasStation, setGasStation] = useState<IGasStation>();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [event, setEvent] = useState<IEventState>({
    title: '',
    start: '',
    end: '',
    user_id: 1
  });

  const { data: events } = useSWR<IEvent[]>(EVENTS_URL, getData);
  const { data: services } = useSWR<IService[]>(SERVICES_URL, getData);
  const { data: gasSations } = useSWR<[]>(GAS_URL, getData);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEvent({
      ...event,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...event,
      allDay: isAllDay,
      color: 'blue',
      serviceId: service.id,
      gasStationId: gasStation.id
    };
    try {
      const response = await createEvent(data);
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
      setRequesting(false);
    } catch (error) {
      // errorDispatch({
      //   type: ERROR_ACTION.SET_ERROR,
      //   error: error.response.data.message
      // });
      // setRequesting(false);
    }
  };

  if (!events) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>Service list</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader handleClickOpenDialog={handleClickOpenDialog} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ServiceTable events={events} />
          </Grid>
        </Grid>
      </Container>
      <FormSetCalendar
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        event={event}
        handleChange={handleChange}
        setGasStation={setGasStation}
        servicers={services}
        gasStations={gasSations}
        setService={setService}
        setIsAllDay={setIsAllDay}
        isAllDay={isAllDay}
        requesting={requesting}
      />
    </>
  );
}

export default ApplicationsTransactions;
