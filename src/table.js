// function Table({ tableData }) {
//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Id</th>
//           <th>no of pages</th>
//           <th>date</th>
//           <th>time</th>
//           <th>Title</th>
//           <th>pdf_url</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((data, index) => {
//           return (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{data.pageno}</td>
//               <td>{data.date}</td>
//               <td>{data.time}</td>
//               <td>{data.Title}</td>
//               <td>
//                 {data.pdf && (
//                   <a href={data.pdf} target="_blank" rel="noopener noreferrer">
//                     Link
//                   </a>
//                 )}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }
// export default Table;
import React from "react";

const Table = ({ tableData, onDeleteRow }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Page No</th>
            <th>Date</th>
            <th>Title</th>
            <th>Abstract</th> {/* Add Abstract column */}
            <th>PDF</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.pageno}</td>
              <td>{data.date}</td>
              <td>{data.Title}</td>
              <td>{data.Abstract}</td> {/* Add Abstract column */}
              <td>
                {data.pdf && (
                  <a href={data.pdf} target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                )}
              </td>
              <td>{data.time}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
