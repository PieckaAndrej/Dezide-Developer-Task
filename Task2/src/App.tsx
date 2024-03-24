import { CurrencyExchange } from '@mui/icons-material';
import { useState } from 'react';
import styles from './App.module.scss';
import InputForm from './components/InputForm/InputForm';
import Result from './components/Result/Result';
import { CostModel } from './models/CostModel';

const App = () => {
  const models: CostModel[] = [
    {
      id: 0,
      name: 'Default Model',
      timeFactor: 300
    },
    {
      id: 1,
      name: 'Model1234',
      timeFactor: 500
    },
  ];


  const [result, setResult] = useState<number>(0);

  return (
    <div className={styles.App}>
      <div className={styles.logo}>
        <CurrencyExchange />
        Cost Converter
      </div>
      <InputForm models={models}
        setResult={setResult}/>
      <span className={styles.equals}>
        =
      </span>
      <Result value={result}/>
    </div>
  );
};

export default App;
