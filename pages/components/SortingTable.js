import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json'


const SortingTable = () => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns,
        data
    }, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance;

    // console.log(headerGroups);

    return (
        <table {...getTableProps()}>

            {/* header */}
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('HEADER')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' D' : ' I') : ""}
                                    </span>
                                </th>
                            ))
                        }
                    </tr>
                ))}
            </thead>

            {/* body */}
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                            })}

                        </tr>

                    )
                })}
            </tbody>

            {/* footer */}
            <tfoot>
                {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))
                        }
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}

export default SortingTable