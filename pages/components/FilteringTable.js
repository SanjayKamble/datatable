import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilter from './GlobalFilter';
import MOCK_DATA from './MOCK_DATA.json'

const FilteringTable = ({ searchable, pagination, data1, columns1 }) => {

    // const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => MOCK_DATA, [])

    const [counter,setCounter] = useState(1);


    const columns = useMemo(() => columns1, []);
    // const data = useMemo(() => data1, []);
    const [data, setData] = useState(data1);
    const tableInstance = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 },
    }, useGlobalFilter, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;

    // useEffect(() => {
    //     onFetchData({ pageIndex, pageSize })
    // }, [pageIndex, pageSize]);

    // console.log(searchable);
    // console.log(getTableProps());
    // console.log(getTableBodyProps());
    // console.log(headerGroups);
    // console.log(headerGroups[0].getHeaderGroupProps());
    // console.log(headerGroups[0].headers[0].getHeaderProps());
    // console.log(headerGroups[0].headers[0].render('HEADER'));
    const { globalFilter } = state;



    function fetchNext(i, s) {
        axios
            .get(`http://localhost:3004/employees?_page=${counter + 1}&_limit=${s}`)
            .then((res) => {
                console.log(res.data);
                setCounter(counter+1);
                setData(res.data);
            })
            .catch(err => console.log(err))

        console.log("index of current page : " + i);
        console.log("Number of rows : " + s);

    }
    return (
        <>
            {/* For searching */}

            {
                searchable ?
                    <div>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>
                    : <></>
            }

            {

                pagination ?
                    <div className="pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        {/* <button onClick={() => nextPage()} disabled={!canNextPage}> */}
                        <button onClick={() => { fetchNext(pageIndex, pageSize); nextPage() }}
                        // disabled={!canNextPage}
                        > 
                            {'>'}
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                            | Go to page:{' '}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                    : <></>

            }

            <table {...getTableProps()}>
                {/* header */}
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('HEADER')}</th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>

                {/* body */}
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
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
                {/* <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                ))
                            }
                        </tr>
                    ))}
                </tfoot> */}
            </table>

        </>
    )
}

export default FilteringTable