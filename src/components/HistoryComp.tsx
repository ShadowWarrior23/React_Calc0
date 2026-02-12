import React from 'react';

interface HistoryProps {
    calcHistory: string;
}

const HistoryComp: React.FC<HistoryProps> = ({calcHistory}) => {
  return (
    <li>{calcHistory}</li>
  )
}

export default HistoryComp