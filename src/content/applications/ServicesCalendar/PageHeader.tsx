import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useTranslation } from 'react-i18next';

function PageHeader({ handleClickOpenDialog }) {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('List of Users Registered the Service')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpenDialog}
        >
          {t('Create Calendar')}
        </Button>
        {/* <Button
          sx={{ mt: { xs: 2, md: 0 }, ml: { xs: 2, md: 1 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpenDialog}
        >
          {t('Create Date Off')}
        </Button> */}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
