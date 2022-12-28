import { DateTimePicker } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Theme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ck-content': {
      height: 250
    }
  }
}));

const FormSetDateOff = ({
  open,
  handleClose,
  handleSubmit,
  event,
  handleChange,
  servicers,
  setType,
  isAllDay,
  setIsAllDay,
  requesting
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>{t('Set Date Off')}</DialogTitle>
      <form className={classes.root} onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label={t('Title')}
                name="title"
                onChange={handleChange}
                value={event.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="datetime-local"
                label={t('Start Date')}
                name="start"
                type="datetime-local"
                sx={{ width: 250 }}
                onChange={handleChange}
                value={event.start}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="datetime-local"
                label={t('End Date')}
                name="end"
                type="datetime-local"
                sx={{ width: 250 }}
                onChange={handleChange}
                value={event.end}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                value={event.type}
                id="combo-box-demo"
                options={servicers}
                onChange={(event, value) => setType(value)}
                renderInput={(params) => {
                  return <TextField {...params} label={t('Type of Service')} />;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={isAllDay} />}
                name="is_all_day"
                onChange={(e) => {
                  setIsAllDay(!isAllDay);
                }}
                labelPlacement="start"
                label={t('All Day') + ':'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            size="large"
            type="submit"
            disabled={requesting}
          >
            {t('Submit')}
          </Button>
          <Button onClick={handleClose}>{t('Cancel')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormSetDateOff;
