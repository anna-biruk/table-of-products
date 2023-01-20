import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataItem } from "./ProductsTable";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface IModalProps {
  open: boolean;
  onClose?: React.ReactEventHandler<{}>;
  tableRow: DataItem;
}

export const ModalWindow = ({ open, onClose, tableRow }: IModalProps) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            variant="h5"
          >
            Item information
          </Typography>
          <Typography variant="h5">Id: {tableRow.id}</Typography>
          <Typography variant="h5">Name: {tableRow.name}</Typography>
          <Typography variant="h5">Year: {tableRow.year}</Typography>
          <Typography variant="h5">Color: {tableRow.color}</Typography>
          <Typography variant="h5">
            Pantone value: {tableRow.pantone_value}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
