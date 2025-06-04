import dayjs from "dayjs";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { MRT_Row } from "material-react-table";

export const cleanObjectForCSV = (obj: Record<string, any>): Record<string, any> => {
    const cleanObj: Record<string, any> = {};
  
    Object.entries(obj).forEach(([key, value]) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined
      ) {
        cleanObj[key] = value;
      } else if (value instanceof Date) {
        cleanObj[key] = value.toISOString();
      } else if (typeof value === 'object') {
        // Puedes ajustar cómo se formatea un objeto. Aquí intentamos mostrar un campo representativo.
        if ('name' in value) cleanObj[key] = value.name;
        else if ('fullname' in value) cleanObj[key] = value.fullname;
        else if ('folio' in value) cleanObj[key] = value.folio;
        else cleanObj[key] = JSON.stringify(value); // última opción
      } else {
        cleanObj[key] = String(value);
      }
    });
  
    return cleanObj;
  };

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
  filename: 'table-data',
});

export const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) =>
      cleanObjectForCSV({
        ...row.original,
        fecha: dayjs(row.original.fecha).format('YYYY-MM-DD'),
      })
    );
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  
  export const handleExportDataTable = (rows: any[]) => {
    const processedRows = rows.map((row) =>
      cleanObjectForCSV({
        ...row,
        fecha: dayjs(row.fecha).format('YYYY-MM-DD'),
      })
    );
    const csv = generateCsv(csvConfig)(processedRows);
    download(csvConfig)(csv);
  };