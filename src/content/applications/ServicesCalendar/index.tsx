import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import { EVENTS_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';
import ServiceTable from './ServiceTable';
import { useState } from 'react';
import FormSetCalendar from 'src/components/FormSetCalendar';
import { createEvent } from 'src/services/EventService';

function ApplicationsTransactions() {
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [servicers, setServicers] = useState(['Clean', 'Polish']);
  const [isAllDay, setIsAllDay] = useState(false);
  const [type, setType] = useState('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [event, setEvent] = useState({
    title: '',
    start_date: '',
    end_date: '',
    user_id: 1
  });

  const { data: events } = useSWR<[]>(EVENTS_URL, getData);
  console.log('event', events);
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
      type: type,
      color: 'blue'
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
        start_date: '',
        end_date: '',
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
        servicers={servicers}
        setType={setType}
        setIsAllDay={setIsAllDay}
        isAllDay={isAllDay}
        requesting={requesting}
      />
    </>
  );
}

export default ApplicationsTransactions;
