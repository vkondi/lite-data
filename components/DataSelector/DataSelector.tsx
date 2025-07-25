'use client';

import { type FC, useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import Layout from "../Layout/Layout";
import DataSelectorField from "./DataSelectorField";
import DataSelectorHeader from "./DataSelectorHeader";

import styles from "./DataSelector.module.css";
import {
  type FieldData,
  useDataSelectorContext,
} from "../../context/DataSelectorContext";

const emptyField: FieldData = { dataType: "", name: "" };

const DataSelector: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fields, setFields } = useDataSelectorContext();

  const onTypeChange = useCallback((value: string, index: number) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, dataType: value, name: value } : field
      )
    );
  }, [setFields]);

  const onNameChange = useCallback((value: string, index: number) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, name: value } : field
      )
    );
  }, [setFields]);

  const onDelete = useCallback((index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  }, [setFields]);

  const handleAddNewRow = () => {
    setFields((prevFields) => [...prevFields, emptyField]);
  };

  const renderedFields = useMemo(() => {
    return fields?.map((field, index) => (
      <DataSelectorField
        key={index}
        index={index}
        onTypeChange={onTypeChange}
        onNameChange={onNameChange}
        onDelete={onDelete}
        dataTypeValue={field.dataType}
        nameValue={field.name}
      />
    ));
  }, [fields, onTypeChange, onNameChange, onDelete]);

  return (
    <div className={styles.container}>
      <Layout>
        <div className={styles.layoutContainer}>
          <DataSelectorHeader />
          {renderedFields}
          <Button
            data-testid="add-new-row-button"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: isMobile ? "100%" : 180,
              margin: "20px 0px 10px 0px",
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={handleAddNewRow}
          >
            Add New Row
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default DataSelector;
