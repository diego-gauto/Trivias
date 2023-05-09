import React from 'react'

const sql = () => {
  // const isValidCSVFile = (file: any) => {
  //   return file.name.endsWith(".csv");
  // }

  // const uploadCsv = (event: any) => {
  //   const reader = new FileReader()
  //   const fileContent = event.target
  //   reader.readAsText(fileContent.files[0])

  //   if (!isValidCSVFile(fileContent.files[0])) { return alert("Por favor ingresa un archivo .csv."); }

  //   reader.onload = () => {
  //     let csvData: any = reader.result
  //     let csvRecordsArray = csvData.split(/\r\n|\n/);


  //     const headersRow = getHeaderArray(csvRecordsArray);
  //     const records = getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

  //     setHeadersRow(headersRow)
  //     setRecords(records)
  //     // getJsonData(records, headersRow)
  //   }
  //   reader.onerror = function () {
  //   };
  // }


  // const getHeaderArray = (csvRecordsArr: any) => {
  //   let headers = (csvRecordsArr[0]).split(',');
  //   let headerArray = [];
  //   for (let j = 1; j < headers.length; j++) {
  //     headerArray.push(headers[j]);
  //   }
  //   return headerArray;
  // }

  // const getDataRecordsArrayFromCSVFile = (csvRecordsArray: any, headerLength: any) => {
  //   let csvArr = [];

  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     let currentRecord = (csvRecordsArray[i]).split(',');
  //     let csvRecord: any = new CsvData();
  //     for (let i = 1; i < currentRecord.length; i++) {
  //       csvRecord.properties.push(currentRecord[i].trim())
  //     }
  //     if (csvRecord.properties[0] != '') { csvArr.push(csvRecord); }
  //   }
  //   return csvArr;
  // }

  // const getJsonData = async (records: any, headersRow: any) => {
  //   const jsonData = records
  //   const headerJson = headersRow
  //   let rec = {
  //     records: jsonData.slice((countdown - 1) * 1, (countdown * 1))
  //   }
  //   await addPastUsers(rec).then((res) => {
  //   })

  // }

  // const [countdown, setCountdown] = useState(1);
  // const [headersRow, setHeadersRow] = useState<any>();
  // const [records, setRecords] = useState<any>(null);
  // const [start, setstart] = useState("stop");

  // // useEffect(() => {
  // //   let timeout: any;
  // //   if (records) {
  // //     if (countdown <= 40) {
  // //       timeout = setTimeout(() => {
  // //         setCountdown(countdown + 1);
  // //         getJsonData(records, headersRow);
  // //         // addDays(records, headersRow);
  // //         console.log(countdown);
  // //         // addProgress()
  // //         // testStripe();
  // //       }, 100);
  // //       return () => clearTimeout(timeout);
  // //     }
  // //   }
  // //   return
  // // }, [records, countdown]);
  // // useEffect(() => {
  // //   let range = {
  // //     start: 40000,
  // //     end: 50001
  // //   }
  // //   getPastUsers(range).then((res) => {
  // //     console.log(res.data.past);

  // //     setPastUsers(res.data.past);
  // //   })
  // // }, [])
  // const testStripe = async () => {
  //   await Promise.all(
  //     pastUsers.slice((countdown - 1) * 1, (countdown * 1)).map(async (user: any, index: number) => {
  //       console.log(index);
  //       let tempUser = {
  //         email: user.email,
  //         id: user.id,
  //         name: user.name,
  //       }
  //       testApi(tempUser).then(() => {

  //       })
  //     })
  //   )
  // }
  // const addProgress = async () => {
  //   await Promise.all(
  //     pastUsers.slice((countdown - 1) * 1, (countdown * 1)).map(async (user: any, index: number) => {
  //       let tempArray = records.filter((x: any) => x.properties[0] === user.email)
  //       if (tempArray.length > 0) {
  //         await Promise.all(tempArray.map(async (element: any) => {
  //           if (user.email === element.properties[0]) {
  //             let tempUser = {
  //               email: user.email,
  //               score: +element.properties[2],
  //               userId: user.id
  //             }
  //             console.log(tempUser);
  //             await updateScorePastUser(tempUser);
  //             await getCourseApi(+element.properties[1]).then(async (course) => {
  //               if (course.lessons && course.lessons.length > 0) {
  //                 let ids = {
  //                   userId: user.id,
  //                   courseId: course.id,
  //                 }
  //                 let tempCertificate = {
  //                   ...ids,
  //                   folio: `${ids.courseId}-${ids.userId}`
  //                 }
  //                 await addUserCertificateApi(tempCertificate)
  //                 course.lessons.forEach(async (lesson: any) => {
  //                   let tempLesson = {
  //                     lessonId: lesson.id,
  //                     userId: user.id
  //                   }
  //                   return await addPastUserProgress(tempLesson)
  //                 });
  //               }
  //             })
  //           }
  //         }))
  //       }
  //     })
  //   )
  // }
  // const addDays = (records: any, headersRow: any) => {
  //   // console.log(records);
  //   let rec = {
  //     records: records.slice((countdown - 1) * 1, (countdown * 1))
  //   }
  //   let date = new Date(rec.records[0].properties[1])
  //   let seconds = date.getTime() / 1000;
  //   console.log(countdown)
  //   //NAILS MASTER ES course_id = 30
  //   //Alineacion cert es course_id = 45
  //   getUserApi(rec.records[0].properties[0]).then((res) => {
  //     let addCourse = {
  //       user_id: res.id,
  //       course_id: 30,
  //       final_date: seconds,
  //     }
  //     console.log(addCourse)
  //     // addCourseMembershipApi(addCourse).then(() => {
  //     //   console.log('exito')
  //     // })
  //   })
  // }
  return (
    <div>sql</div>
  )
}
export default sql;