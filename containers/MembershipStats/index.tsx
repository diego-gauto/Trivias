import { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

import { getLastsActive } from "../../components/api/subStats";
import styles from "./membershipsStats.module.css"; // Desestructuración de styles

interface Stat {
  monthly_conekta: number;
  monthly_paypal: number;
  monthly_admin: number;
  quarterly_conekta: number;
  quarterly_paypal: number;
  quarterly_admin: number;
  quarterly_oxxo: number;
  quarterly_spei: number;
  yearly_conekta: number;
  yearly_paypal: number;
  yearly_admin: number;
  yearly_oxxo: number;
  yearly_spei: number;
  date: string; // Asumiendo que también tienes una propiedad para la fecha
}

const StatsTable = () => {
  const [stats, setStats] = useState<any>([]);

  const { container, title, loading, tableContainer } = styles

  useEffect(() => {
    // Llamada a la función para obtener los últimos 4 registros
    getLastsActive()
      .then(data => {
        setStats(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, []);

  // Comparar dos números y devolver el color de la letra
  const getTextColor = (current: number, previous: number) => {
    if (current > previous) return 'green';
    if (current < previous) return 'red';
    return 'black'; // Sin cambio
  };

  // Mapeo de nombres
  const nameMapping: { [key: string]: string } = {
    'monthly_conekta': 'Mensuales Conekta',
    'monthly_paypal': 'Mensuales PayPal',
    'monthly_admin': 'Mensuales Activadas',
    'quarterly_conekta': 'Cuatrimestrales Conekta',
    'quarterly_paypal': 'Cuatrimestrales PayPal',
    'quarterly_admin': 'Cuatrimestrales Activadas',
    'quarterly_oxxo': 'Cuatrimestrales OXXO',
    'quarterly_spei': 'Cuatrimestrales Transf',
    'yearly_conekta': 'Anuales Conekta',
    'yearly_paypal': 'Anuales PayPal',
    'yearly_admin': 'Anuales Activadas',
    'yearly_oxxo': 'Anuales OXXO',
    'yearly_spei': 'Anuales Transf'
  };

  // Crear los datos de la tabla
  const data = [
    'monthly_conekta', 'monthly_paypal', 'monthly_admin',
    'quarterly_conekta', 'quarterly_paypal', 'quarterly_admin',
    'quarterly_oxxo', 'quarterly_spei',
    'yearly_conekta', 'yearly_paypal', 'yearly_admin',
    'yearly_oxxo', 'yearly_spei'
  ].map((field: any) => {
    const rowData: any = { fieldName: nameMapping[field] || field.replace(/_/g, ' ') }; // Usar el mapeo
    stats.forEach((stat: any, index: any) => {
      rowData[`stat${index}`] = stat[field];
    });
    return rowData;
  });

  // Fila de "Total" con la suma de cada columna
  const totalRow = {
    fieldName: 'Total',
    ...data.reduce((acc: any, row: any) => {
      Object.keys(row).forEach(key => {
        if (key !== 'fieldName') {
          const value = Number(row[key]) || 0; // Convierte a número
          acc[key] = (acc[key] || 0) + value; // Sumar al acumulador
        }
      });
      return acc;
    }, {}),
  };

  const columns = [
    {
      name: 'Método de pago',
      selector: (row: any) => row.fieldName,
      sortable: true,
    },
    ...stats.map((stat: any, index: any) => ({
      name: stat.date,
      selector: (row: any) => row[`stat${index}`],
      sortable: true,
      cell: (row: any) => {
        // La columna más vieja no tiene color (index 3, la última columna)
        if (index === stats.length - 1) {
          return <div>{row[`stat${index}`]}</div>;
        }

        // Comparar con la columna inmediatamente anterior (más vieja)
        const previous = row[`stat${index + 1}`] || 0; // Comparar con la columna a la derecha
        return (
          <div style={{ color: getTextColor(row[`stat${index}`], previous) }}>
            {row[`stat${index}`]}
          </div>
        );
      },
    })),
  ];

  const customStyles = {
    table: {
      style: {
        border: '1px solid #ccc', // Borde alrededor de la tabla
      },
    },
    rows: {
      style: {
        minHeight: '30px',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center' as 'center',
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: '#154360',
        color: '#fff',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        justifyContent: 'center',
        textAlign: 'center' as 'center',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  return (
    <div className={container}>
      <h1 className={title}>Membresías activas por semana</h1>
      {stats.length === 4 ? (
        <div className={tableContainer}> {/* Nuevo contenedor para la tabla */}
          <DataTable
            columns={columns}
            data={[...data, totalRow]} // Añadir la fila de total al final de los datos
            pagination={false}
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        </div>
      ) : (
        <p className={loading}>Cargando estadísticas...</p>
      )}
    </div>
  );
};


export default StatsTable;