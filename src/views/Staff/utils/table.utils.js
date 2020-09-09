import React from "react";
import { Chip } from "@material-ui/core";
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
} from "@material-ui/icons";

const getGender = (gender) => {
  switch (gender) {
    case "E_MALE":
      return "Nam";
    case "E_FEMALE":
      return "Nữ";
    default:
      return "Khác";
  }
};

const getDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB");
};

const getTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-GB");
};

const getDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-GB");
};

const getStatusSyn = (status) => {
  switch (status) {
    case "E_HIRE":
      return (
        <Chip
          icon={<SentimentSatisfiedAlt />}
          size="small"
          label="Đang làm việc"
          color="primary"
        />
      );
    case "E_STOP":
      return (
        <Chip
          icon={<SentimentVeryDissatisfied />}
          size="small"
          label="Nghỉ việc"
          color="default"
        />
      );
    default:
      return "";
  }
};

const getDays = (day) => {
  return Math.ceil((parseInt(day) / (9 * 60 * 60 * 1000)) * 100) / 100;
};

const getHours = (day) => {
  return Math.ceil((parseInt(day) / (60 * 60 * 1000)) * 10) / 10;
};

const getStatusSynNew = (status) => {
  switch (status) {
    case "E_HIRE":
      return "Chưa duyệt";
    default:
      return "Đã duyệt";
  }
};

export {
  getDays,
  getGender,
  getDate,
  getTime,
  getDateTime,
  getStatusSyn,
  getHours,
  getStatusSynNew,
};
