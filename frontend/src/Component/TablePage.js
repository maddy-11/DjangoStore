import React from 'react';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';

const TablePage = ({ columns, data, columnOrder }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      columnOrder: columnOrder,
    },
  });

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '500px' }}>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TablePage;
