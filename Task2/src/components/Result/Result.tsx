import React, { FC, useState } from 'react';
import styles from './Result.module.scss';
import { Tooltip, Button } from '@mui/material';

interface ResultProps {
  value: number;
}

const Result: FC<ResultProps> = (props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopyClick = () => {
    navigator.clipboard.writeText(props.value.toString());

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className={styles.Result}>
      <Tooltip title={copied ? 'Copied!' : 'Click to copy'} arrow>
        <Button
          onClick={onCopyClick}
          sx={{
            color: 'rgba(0,0,0,0.8)',
            fontSize: '10rem',
            lineHeight: '1.1',
          }}>
          <span className={styles.resultText}>
            {props.value}
          </span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default Result;
