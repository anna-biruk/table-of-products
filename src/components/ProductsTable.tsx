import { useState } from "react";
import Table from "@mui/material/Table";
import Input from "@mui/joy/Input";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { ModalWindow } from "./ModalWindow";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useFetch from "../hooks/useFetch";

export type DataItem = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export const ProductsTable = () => {
  const [search, setSearch] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DataItem | null>();

  const { data, totalPages, error } = useFetch(
    `https://reqres.in/api/products`,
    page,
    search
  );

  const handleCloseModal = () => {
    setOpen(false);
    setSelected(null);
  };
  const handleOpenModal = (tableRow: DataItem) => () => {
    setSelected(tableRow);
    setOpen(true);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(Number(event.target.value));
  };

  return (
    <>
      <Input
        onChange={handleSearch}
        placeholder="Search"
        variant="outlined"
        size="md"
        type="number"
        sx={{ width: 200, margin: "0 auto", marginTop: 2 }}
        color="neutral"
      />
      {error ? (
        <Alert
          severity="error"
          sx={{ maxWidth: 600, margin: "0 auto", marginTop: 10 }}
        >
          <AlertTitle>Error</AlertTitle>
          This row not found in the table — <strong>check it out!</strong>
        </Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 600, margin: "0 auto", marginTop: 10 }}
        >
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow
                    onClick={handleOpenModal(item)}
                    key={item.id}
                    sx={{ backgroundColor: `${item.color}` }}
                  >
                    <TableCell
                      align="center"
                      style={{ width: 100 }}
                      component="th"
                      scope="row"
                    >
                      {item.id}
                    </TableCell>
                    <TableCell align="center" style={{ width: 160 }}>
                      {item.name}
                    </TableCell>
                    <TableCell align="center" style={{ width: 160 }}>
                      {item.year}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalPages && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalPages}
          shape="rounded"
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        />
      )}
      {selected && (
        <ModalWindow
          tableRow={selected}
          open={open}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
