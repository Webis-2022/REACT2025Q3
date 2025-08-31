import React, { useMemo } from 'react';
import type { Country } from '../api/countries-resource';

type RowProps = {
  name: string;
  info: Country;
  selectedYear: string;
  sortOrder: 'asc' | 'desc';
  methaneColumn: string;
  methanePerCapitaColumn: string;
};

const formatNumber = (num: number | undefined) => {
  return num !== undefined
    ? num.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : 'NA';
};

const RowComponent = ({
  name,
  info,
  selectedYear,
  sortOrder,
  methaneColumn,
  methanePerCapitaColumn,
}: RowProps) => {
  const sortedData = useMemo(() => {
    return sortOrder === 'asc'
      ? [...info.data].sort((a, b) => a.year - b.year)
      : [...info.data].sort((a, b) => b.year - a.year);
  }, [info.data, sortOrder]);

  const latestData = useMemo(() => {
    if (selectedYear) {
      return (
        sortedData.find((r) => r.year === Number(selectedYear)) ??
        sortedData[sortedData.length - 1]
      );
    }
    return sortedData[sortedData.length - 1];
  }, [sortedData, selectedYear]);

  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{latestData?.population?.toLocaleString() ?? 'N/A'}</td>
      <td>{info?.iso_code ?? 'N/A'}</td>
      <td>{formatNumber(latestData?.co2)}</td>
      <td>{formatNumber(latestData?.co2_per_capita)}</td>
      {methaneColumn && <td>{formatNumber(latestData?.methane)}</td>}
      {methanePerCapitaColumn && (
        <td>{formatNumber(latestData?.methane_per_capita)}</td>
      )}
    </tr>
  );
};

export const Row = React.memo(RowComponent);
