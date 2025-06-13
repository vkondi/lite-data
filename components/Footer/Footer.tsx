'use client';

/**
 * A footer component that contains a Generate button for data generation.
 * The button is disabled when any field in the data selector context has an empty name or data type.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns A footer element containing a Generate button that triggers data generation when clicked
 */

import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, FormControl, InputLabel, Select, MenuItem, TextField, Snackbar, Alert, Box, SelectChangeEvent } from "@mui/material";
import { useDataSelectorContext } from "../../context/DataSelectorContext";
import styles from "./Footer.module.css";
import axios from "axios";
import { EXPORT_URL } from "../../utils/URL";

const FILE_FORMAT_OPTIONS = [
  { id: "csv", label: "CSV" },
  { id: "json", label: "JSON" },
  { id: "xml", label: "XML" },
  { id: "html", label: "HTML" },
  { id: "xlsx", label: "XLS/Excel" },
];

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fields } = useDataSelectorContext();
  const [fileFormat, setFileFormat] = useState("csv");
  const [rowCount, setRowCount] = useState("10");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleFileFormatChange = (event: SelectChangeEvent) => {
    setFileFormat(event.target.value);
  };

  const handleRowCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowCount(event.target.value);
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post(EXPORT_URL, {
        fields,
        count: parseInt(rowCount),
        file_format: fileFormat,
      }, { responseType: 'blob' });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `generated_data.${fileFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSnackbarMessage("Data generated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch {
      setSnackbarMessage("Error generating data. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = fields.every((field) => field.dataType && field.name);

  const renderControls = () => {
    const controls = [
      <FormControl 
        key="format"
        variant="outlined" 
        size="small"
        sx={{ 
          minWidth: 120,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <InputLabel>File Format</InputLabel>
        <Select
          value={fileFormat}
          onChange={handleFileFormatChange}
          label="File Format"
        >
          {FILE_FORMAT_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>,
      <TextField
        key="rows"
        label="Number of Rows"
        type="number"
        value={rowCount}
        onChange={handleRowCountChange}
        size="small"
        sx={{ 
          width: 150,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />,
      <Button
        key="generate"
        variant="contained"
        onClick={handleGenerate}
        disabled={!isFormValid}
        sx={{
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          },
        }}
      >
        Generate
      </Button>
    ];

    if (isMobile) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {controls.slice(0, 2)}
          </Box>
          {controls[2]}
        </Box>
      );
    }

    return controls;
  };

  return (
    <footer className={styles.footer} style={{ backgroundColor: theme.palette.background.paper }}>
      <div className={styles.footerContent}>
        <div className={styles.controls}>
          {renderControls()}
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </footer>
  );
};

export default Footer;
