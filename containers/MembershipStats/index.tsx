// import { useEffect, useState } from "react";

// import { getLastsActive } from "../../components/api/subStats";

// const StatsTable = () => {
//   const [stats, setStats] = useState<any>([]);

//   useEffect(() => {
//     // Llamada a la función para obtener los últimos 4 registros
//     getLastsActive()
//       .then(data => {
//         setStats(data);
//         console.log(data)
//       })
//       .catch(error => {
//         console.error('Error fetching stats:', error);
//       });
//   }, []);

//   // Comparar dos números y devolver el color del fondo
//   const getBackgroundColor = (current: number, previous: number) => {
//     if (current > previous) return 'green';
//     if (current < previous) return 'red';
//     return 'white';
//   };

//   return (
//     <div>
//       <h1>Últimas estadísticas de suscriptores</h1>
//       {stats.length === 4 ? (
//         <table >
//           <thead>
//             <tr>
//               <th>Campo</th>
//               {stats.map((stat: any, index: any) => (
//                 <th key={index}>{stat.date}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {['monthly_conekta', 'monthly_paypal', 'monthly_admin',
//               'quarterly_conekta', 'quarterly_paypal', 'quarterly_admin',
//               'quarterly_oxxo', 'quarterly_spei',
//               'yearly_conekta', 'yearly_paypal', 'yearly_admin',
//               'yearly_oxxo', 'yearly_spei'].map((field: any, rowIndex) => (
//                 <tr key={rowIndex}>
//                   <td>{field.replace(/_/g, ' ')}</td>
//                   {stats.map((stat: any, colIndex: any) => {
//                     // Si colIndex es 0 o el valor anterior es undefined, usa 0 como valor por defecto
//                     const previous = colIndex > 0 ? stats[colIndex - 1]?.[field] || 0 : stat[field];
//                     return (
//                       <td key={colIndex} style={{ backgroundColor: getBackgroundColor(stat[field], previous) }}>
//                         {stat[field]}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Cargando estadísticas...</p>
//       )}
//     </div>
//   );
// };

// export default StatsTable;

import { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

import { getLastsActive } from "../../components/api/subStats";

const StatsTable = () => {
  const [stats, setStats] = useState<any>([]);

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

  // Comparar dos números y devolver el color del fondo
  const getBackgroundColor = (current: number, previous: number) => {
    if (current > previous) return 'green';
    if (current < previous) return 'red';
    return 'white';
  };

  // Definir columnas para DataTable
  const columns = [
    {
      name: 'Campo',
      selector: (row: any) => row.fieldName,
      sortable: true,
    },
    ...stats.map((stat: any, index: any) => ({
      name: stat.date,
      selector: (row: any) => row[`stat${index}`],
      sortable: true,
      cell: (row: any) => (
        <div style={{ backgroundColor: getBackgroundColor(row[`stat${index}`], row[`stat${index - 1}`] || 0) }}>
          {row[`stat${index}`]}
        </div>
      ),
    })),
  ];

  // Crear las filas para DataTable
  const data = [
    'monthly_conekta', 'monthly_paypal', 'monthly_admin',
    'quarterly_conekta', 'quarterly_paypal', 'quarterly_admin',
    'quarterly_oxxo', 'quarterly_spei',
    'yearly_conekta', 'yearly_paypal', 'yearly_admin',
    'yearly_oxxo', 'yearly_spei'
  ].map((field: any) => {
    const rowData: any = { fieldName: field.replace(/_/g, ' ') };
    stats.forEach((stat: any, index: any) => {
      rowData[`stat${index}`] = stat[field];
    });
    return rowData;
  });

  return (
    <div>
      <h1>Últimas estadísticas de suscriptores</h1>
      {stats.length === 4 ? (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      ) : (
        <p>Cargando estadísticas...</p>
      )}
    </div>
  );
};

export default StatsTable;