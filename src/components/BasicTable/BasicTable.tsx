import { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import MaterialReactTable from 'material-react-table';

type BasicTableProps = {
	data: any[];
	columns: any[];
};

const BasicTable: FC<BasicTableProps> = ({ columns, data }) => {
	const columnsData = useMemo(() => columns, [columns]);

	return <MaterialReactTable columns={columnsData} data={data} />;
};

export default BasicTable;
