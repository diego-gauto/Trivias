import router, { useRouter } from "next/router";

const getMonth = (month: number) => {
  if (month === 1) {
    return "enero";
  } else if (month === 2) {
    return "febrero";
  } else if (month === 3) {
    return "marzo";
  } else if (month === 4) {
    return "abril";
  } else if (month === 5) {
    return "mayo";
  } else if (month === 6) {
    return "junio";
  } else if (month === 7) {
    return "julio";
  } else if (month === 8) {
    return "agosto";
  } else if (month === 9) {
    return "septiembre";
  } else if (month === 10) {
    return "octubre";
  } else if (month === 11) {
    return "noviembre";
  } else if (month === 12) {
    return "diciembre";
  } else {
    return "";
  }
};
export function CanonicalURL() {
  const router: any = useRouter();
  const siteUrl: any = "https://www.gonvar.io";
  const cleanPath: any = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${siteUrl}` + (router.asPath === "/" ? "" : cleanPath);
  return canonicalUrl;
}
export function formatBlogDate(created_at: Date) {
  let date = new Date(created_at);
  let tempDay = date.getDate();
  let tempMonth = date.getMonth() + 1;
  let textMonth: string = getMonth(tempMonth);
  let tempYear = date.getFullYear();
  return {
    day: tempDay,
    month: textMonth,
    year: tempYear,
  };
}
export function formatBlogDateCase2(created_at: Date) {
  let date = new Date(created_at);
  let tempDay = date.getDate();
  let tempMonth = date.getMonth() + 1;
  let textMonth: string = getMonth(tempMonth);
  let tempYear = date.getFullYear();
  return `${textMonth} ${tempDay}, ${tempYear}`;
}

export function FormatDateForBack(date: Date) {
  if (date) {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate + " 00:00:00";
  } else {
    return "14-05-2023 00:00:00";
  }
}
export function FormatCourses(course: any) {
  let tempCourse = course.filter((c: any) => c.type === "Producto");
  return tempCourse;
}
