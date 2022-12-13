import React, { useMemo, useState } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
const ServiceTable = ({ events }) => {
  const [pageSize, setPageSize] = useState(20);
  const [rowId, setRowId] = useState(null);
  const rows = events === undefined ? [] : events;

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 100 },
      { field: 'title', headerName: 'title', width: 120 },
      { field: 'start', headerName: 'start_date', width: 250 },
      { field: 'end', headerName: 'end_date', width: 250 },
      { field: 'type', headerName: 'type', width: 220 },
      { field: 'allDay', headerName: 'is_all_day' },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          // <ActionCategoryArticleTable {...{ params, rowId, setRowId, page }} />
          <></>
        )
      }
    ],
    [rowId]
  );

  if (!events) return <CircularProgress />;
  return (
    <Box
      sx={{
        height: 490,
        width: '100%',
        pb: 5
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        pagination
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={!events ? true : false}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900]
          }
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default ServiceTable;
