import {
  addUserHistory,
  updateUserProgressApi,
} from "../../../../components/api/lessons";
import { LESSON_PATH } from "../../../../constants/paths";
import { ISeasons } from "../../../../interfaces/ICourse";
import { IUser } from "../../../../interfaces/IUserData";
import router from "next/router";

export const lessonGuard = (user: IUser) => {
  if (user !== null) {
    user.level = 1;
    if (user.level === 1 || 4 || 5 || 6) {
      return true;
    }
  } else {
    router.push({ pathname: "/preview" });
  }
  return;
};

export const returnLevel = (level: string) => {
  if (level === "Muy Fácil") {
    return "../images/iconoAzul.png";
  }
  if (level === "Fácil") {
    return "../images/iconoLila.png";
  }
  if (level === "Intermedio") {
    return "../images/iconoNaranja.png";
  }
  if (level === "Avanzado") {
    return "../images/iconoVerde.png";
  }
  if (level === "Máster") {
    return "../images/iconoRosa.png";
  }
  return;
};

export const returnProgress = (season: ISeasons, userId: number) => {
  let tempViewd = 0;
  season.lessons.forEach((element: any) => {
    if (element.users.includes(userId)) {
      tempViewd++;
    }
  });
  return tempViewd;
};

export const hms = (totalSeconds: any) => {
  if (typeof totalSeconds == "string") return totalSeconds;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  let result = `${minutes.toString().padStart(1, "0")} min`;
  if (!!hours) {
    result = `${hours.toString()} hr ${minutes} min`;
  }
  return result;
};

export const goTo = (courseId: number, season: number, lesson: number) => {
  return router.push({
    pathname: "lessonTemp",
    query: { id: courseId, season: season, lesson: lesson },
  });

  // return (window.location.href = `/lessonTemp?id=${courseId}&season=${season}&lesson=${lesson}`);
};

export const returnStatus = (
  season: number,
  lesson: number,
  params: any,
  course: any,
  userId: number
) => {
  let status = "";
  if (course.seasons[season].lessons[lesson].users.includes(userId)) {
    status = "completed";
  }
  if (season === +params.query.season && lesson === +params.query.lesson) {
    status = "actual";
  }
  return status;
};

export const goToNextLesson = (course: any, season: number, lesson: number) => {
  if (course.seasons[season].lessons[lesson + 1]) {
    return router.push({
      pathname: "lessonTemp",
      query: { id: course.id, season: season, lesson: lesson + 1 },
    });
  }
  if (
    !course.seasons[season].lessons[lesson + 1] &&
    course.seasons[season + 1]
  ) {
    return router.push({
      pathname: "lessonTemp",
      query: { id: course.id, season: season + 1, lesson: 0 },
    });
  }
  return;
};

export const goToPreviousLesson = (
  course: any,
  season: number,
  lesson: number
) => {
  if (course.seasons[season].lessons[lesson - 1]) {
    return router.push({
      pathname: "lessonTemp",
      query: { id: course.id, season: season, lesson: lesson - 1 },
    });
  }
  if (
    !course.seasons[season].lessons[lesson - 1] &&
    course.seasons[season - 1]
  ) {
    return router.push({
      pathname: "lessonTemp",
      query: {
        id: course.id,
        season: season - 1,
        lesson: course.seasons[season - 1].lessons.length - 1,
      },
    });
  }
  return;
};

export const handleViewed = (user: any, lesson: any) => {
  if (user) {
    let index = lesson.progress.findIndex(
      (x: any) => x.user_id == user.user_id
    );
    if (lesson.progress[index] && lesson.progress[index].time >= 99) {
      return 0;
    } else {
      if (index == -1) {
        return 0;
      } else {
        return lesson.progress[index].seconds;
      }
    }
  } else {
    return 0;
  }
};

export const handleProgress = async (
  user: any,
  course: any,
  params: any,
  duration: number,
  seconds: number
) => {
  let progress = (seconds * 100) / duration;
  let tempProgress = {
    time: progress,
    seconds: seconds,
    lessonId:
      course.seasons[params.query.season].lessons[params.query.lesson].id,
    userId: user.user_id,
  };
  if (user) {
    await updateUserProgressApi(tempProgress).then(() => {
      if (user) {
        let temp = {
          courseId: course.id,
          seasonId: course.seasons[params.query.season].id,
          lessonId:
            course.seasons[params.query.season].lessons[params.query.lesson].id,
          userId: user.user_id,
        };
        addUserHistory(temp);
      }
    });
  }
};
