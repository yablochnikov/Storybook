import { FC, useMemo } from 'react';
import MaterialReactTable, { MaterialReactTableProps } from 'material-react-table';

export interface BasicTableProps {
	columns: any;
	data: any;
}

const BasicTable: FC<BasicTableProps> = ({ columns, ...props }) => {
	const columnsData = useMemo(() => columns, [columns]);

	return <MaterialReactTable columns={columnsData} {...props} />;
};

export default BasicTable;
