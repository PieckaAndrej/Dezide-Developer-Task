import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';
import { CostModel } from '../../models/CostModel';
import { convertCost } from '../../services/costConvertService';
import { convertDateStringToMinutes, convertStringToDateString, normalizeDateString } from '../../services/utilsService';
import styles from './InputForm.module.scss';

interface InputFormProps {
  models: CostModel[];
  setResult: Dispatch<React.SetStateAction<number>>;
}

const InputForm: FC<InputFormProps> = (props) => {

  const [form, setForm] = useState({
    time: '',
    money: '',
    model: props.models[0].id
  });

  useEffect(() => {
    props.setResult(convertCost(
      convertDateStringToMinutes(form.time), +form.money,
      props.models.find(m => m.id === form.model)?.timeFactor ?? props.models[0].timeFactor));

  }, [form, props]);

  const onTimeBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (e.target.value.length > 0) {
      e.target.value = normalizeDateString(e.target.value);
    }

    handleChange(e);
  };

  const onMoneyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+e.target.value < 0) {
      e.target.value = '0';
    }

    handleChange(e);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {

    setForm(prevForm => {
      return {...prevForm, [e.target.name]: e.target.value};
    });
  };

  const renderModelOptions = useCallback(() => {
    return props.models.map((model, index) => {
      return (
        <MenuItem key={index} value={model.id}>
          <span>
            {model.name}
          </span>
          <span className={styles.menuTimeFactor}>
            {model.timeFactor}/hr
          </span>
        </MenuItem>
      );
    });
  }, [props.models]);

  return (
    <div className={styles.InputForm}>
      <TextField fullWidth
        id="time"
        label="Time"
        name='time'
        value={form.time.length == 0 ? '' : convertStringToDateString(form.time)}
        onChange={handleChange}
        onBlur={onTimeBlur}
        placeholder='HH:MM:SS'
        variant="filled" />
      <TextField fullWidth
        id="money"
        label="Money"
        name='money'
        type='number'
        value={form.money}
        onChange={onMoneyChange}
        variant="filled" />
      <FormControl variant='filled' fullWidth>
        <InputLabel id="model-label">Model</InputLabel>
        <Select
          labelId="model-label"
          id="model-select"
          value={form.model}
          label="Model"
          name='model'
          renderValue={value => props.models.find(m => m.id === value)?.name}
          onChange={(e) => handleChange(e)}
        >
          {renderModelOptions()}
        </Select>
      </FormControl>
    </div>
  );
};

export default InputForm;
