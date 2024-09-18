import React, { useEffect, useState } from "react";

import { AiOutlineHourglass, AiOutlineStar } from "react-icons/ai";
import { FaAward, FaPrescriptionBottleAlt } from "react-icons/fa";

import { useRouter } from "next/router";

import { getAllRewardDataApi, getPublishedRewardsApi } from "../../../components/api/rewards";
import { getUserApi } from "../../../components/api/users";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import {
  AllSlider,
  RewardsTitle,
  RewardCardContainer,
  RewardContainer,
  TitleContainer,
} from "./Rewards.styled";
import RewardSlider from "./Sliders/RewardSlider";

const Rewards = () => {
  const [rewards, setRewards] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [completeCertificates, setCompleteCertificates] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  let today = new Date().getTime() / 1000;
  const [rewardsTypes, setRewardsTypes] = useState([]);
  const [userReward, setUserReward] = useState([]);
  const [monthProgress, setMonthProgress] = useState(0);
  const [missingData, setMissingData] = useState<number>(0);
  const [timeLevel, setTimeLevel] = useState<any>(0);
  const [allSlider, setAllSlider] = useState<any>([
    { type: 'claim-points' },
    { type: 'points' },
  ]);
  const [selectReward, setSelectReward] = useState('points');
  const crownImage = '/images/profile/crown.png';
  const handStarImage = '/images/Rewards/handStar.png';
  const router = useRouter();
  const changeRewardPosition = (val: string) => {
    let tempSlides: any = [];
    setSelectReward(val);

    if (val == 'points') {
      tempSlides = [{ type: 'claim-points' }, { type: 'points' }];
      setAllSlider(tempSlides);
    }
    if (val == 'months') {
      tempSlides = [{ type: 'claim-months' }, { type: 'months' }];
      setAllSlider(tempSlides);
    }
    if (val == 'certificates') {
      tempSlides = [{ type: 'claim-certificates' }, { type: 'certificates' }];
      setAllSlider(tempSlides);
    }
  };
  function shortName(name: string) {
    let maxLength = 11;
    const words = name.split(' ');
    if (words.length > 1) {
      return words[0];
    } else {
      if (name.length > maxLength) {
        return name.substring(0, maxLength) + '...';
      }
    }
    return name;
  }
  const getRewardData = async (user: any) => {
    let nextCourseCertificate: any = [];
    let completedCertificates: any = [];
    let tempDayCount: any = today - user.start_date;
    let getMonth: any;
    let requests: any;
    let tempRewards: any = [];
    if (user.level === 1 || user.final_date > today) {
      if (user.start_date === 0) {
        getMonth = 0;
      } else {
        getMonth = tempDayCount / (3600 * 24 * 30);
      }
    } else {
      getMonth = 0;
    }
    setMonthProgress(getMonth);
    setTimeLevel(Math.floor(getMonth));
    let tempTimeLevel: any = Math.floor(getMonth);
    await getPublishedRewardsApi().then(async (res) => {
      await Promise.all(
        res.map((reward: any) => {
          tempRewards.push(reward);
        }),
      );
      setRewards(res);
    });
    await getAllRewardDataApi(user.id).then((res) => {
      completedCertificates = res.certificates;
      nextCourseCertificate = res.nextCertificates;
      requests = res.requests;
    });
    let data = {
      reward: tempRewards,
      user: user,
      nextCourseCertificate: nextCourseCertificate[0],
      totalCertificates: completedCertificates.length,
      monthCompleted: tempTimeLevel,
      monthPercentage: getMonth,
    };
    setUserReward(requests);
    setCompleteCertificates(completedCertificates);
    setCourses(nextCourseCertificate);
    await getNextRewards(data);
  };
  const getTimeReward = async (props: any) => {
    const { monthPercentage, reward } = props;
    let monthRewardCompleted = [];
    let progressMonth: number = 565;
    let monthFilter = [];
    monthFilter = reward.filter(
      (data: any) => data.type === 'months' && monthPercentage < data.month,
    );
    monthRewardCompleted = reward.filter(
      (data: any) => data.type === 'months' && monthPercentage >= data.month,
    );
    monthFilter.sort((a: any, b: any) => a.month - b.month);
    monthRewardCompleted.sort((a: any, b: any) => b.month - a.month);
    if (monthFilter.length === 0) {
      monthFilter = [
        {
          month: 0,
          title: 'Sin Recompensas',
        },
      ];
    } else {
      if (monthRewardCompleted.length === 0) {
        progressMonth =
          565 - ((monthProgress - 0) / (monthFilter[0].month - 0)) * 565;
      } else {
        progressMonth =
          565 -
          ((monthProgress - monthRewardCompleted[0].month) /
            (monthFilter[0].month - monthRewardCompleted[0].month)) *
          565;
      }
    }
    console.log(progressMonth)
    console.log(monthFilter)
    console.log(monthRewardCompleted)
    return { progressMonth, monthFilter, monthRewardCompleted };
  };
  const getNextRewards = async (data: any) => {
    let pointsFilter: any = [];
    let pointRewardCompleted = [];
    let progressPoints: number = 0;
    let progressCertificates: number = 565;
    const {
      monthCompleted,
      monthPercentage,
      nextCourseCertificate,
      reward,
      totalCertificates,
      user,
    } = data;
    pointsFilter = reward.filter(
      (data: any) => data.type === 'points' && user.score < data.points,
    );
    pointRewardCompleted = reward.filter(
      (data: any) => data.type === 'points' && user.score >= data.points,
    );
    pointsFilter.sort((a: any, b: any) => a.points - b.points);
    pointRewardCompleted.sort((a: any, b: any) => b.points - a.points);

    if (pointsFilter.length === 0) {
      pointsFilter = [
        {
          points: 0,
          title: 'Sin Recompensas',
        },
      ];
    } else {
      if (pointRewardCompleted.length === 0) {
        progressPoints =
          565 - ((user.score - 0) / (pointsFilter[0].points - 0)) * 565;
      } else {
        progressPoints =
          565 -
          ((user.score - pointRewardCompleted[0].points) /
            (pointsFilter[0].points - pointRewardCompleted[0].points)) *
          565;
      }
    }
    if (nextCourseCertificate) {
      progressCertificates = (1 - nextCourseCertificate.progress) * 565;
    } else {
      progressCertificates = 565;
    }
    let timeRewardData = {
      monthPercentage: monthPercentage,
      reward: reward,
    };
    await getTimeReward(timeRewardData).then((timeReward) => {
      let arrayRewards: any = [
        {
          type: 'points',
          scoreType: 'puntaje',
          score: user.score,
          title: pointsFilter[0].title,
          points: pointsFilter[0].points,
          completed: pointRewardCompleted.length,
          progress: progressPoints,
        },
        {
          type: 'months',
          scoreType: 'meses',
          score: monthCompleted,
          title: timeReward.monthFilter[0].title,
          months: timeReward.monthFilter[0].month,
          completed: timeReward.monthRewardCompleted.length,
          progress: timeReward.progressMonth,
        },
        {
          type: 'certificates',
          scoreType: 'certificados',
          score: totalCertificates ? totalCertificates : 0,
          title: nextCourseCertificate?.title
            ? nextCourseCertificate.title
            : 'Sin certificados',
          certificates: nextCourseCertificate?.lessonsLeft
            ? nextCourseCertificate.lessonsLeft
            : 0,
          completed: totalCertificates ? totalCertificates : 0,
          progress: progressCertificates,
        },
      ];
      setLoading(false);
      setMissingData(missingData + 1);
      setRewardsTypes(arrayRewards);
    });
  };
  window.addEventListener('resize', () => {
    setInnerWidth(window.innerWidth <= 400 ? 399 : window.innerWidth);
  });
  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        setUserData(res);
        getRewardData(res);
      });
    } else {
      localStorage.setItem('rewards', 'true');
      router.push({ pathname: '/auth/login' });
    }
  }, []);
  useEffect(() => {
    if (missingData === 1) {
      getRewardData(userData);
    }
  }, [missingData]);

  if (loading) {
    return (
      <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }
  return (
    <RewardContainer>
      <TitleContainer>
        <div className='rewards-circle'>
          <div className='inside' />
        </div>
        <title>Recompensas</title>
        <h1 className='title' style={{ fontWeight: 500 }}>
          CENTRO DE <span>RECOMPENSAS</span>
        </h1>
      </TitleContainer>
      <RewardsTitle>
        <div className='hand-container'>
          <img src={handStarImage} />
        </div>
        <p className='main-text'>
          ¡Haz hecho
          <br /> un gran trabajo <br />
          hasta ahora,
          <br />
          <span> {shortName(userData.name)}!</span>
        </p>
        <div className='sub-paragraph'>
          <p className='second-text'>
            Descubre lo que tu progreso <br />
            en <span className='span-color'>Gonvar</span> trajo para ti.
          </p>
          <p className='second-text'>
            No olvides regresar pronto
            <br />
            <span className='span-weight'>para descubrir nuevos premios.</span>
          </p>
        </div>
        <div className='reward-card-container'>
          {rewardsTypes.map((val: any, index: any) => {
            return (
              <RewardCardContainer
                key={'RewardsCard ' + index}
                reward={selectReward}
                progress={val.progress}
                type={val.type}
                onClick={() => changeRewardPosition(val.type)}
              >
                <div className='circle-level'>
                  <img src={crownImage} className='crown' />
                  <p className='points'>
                    {' '}
                    {val.completed > 9 || val.completed == 0
                      ? val.completed
                      : '0' + val.completed}
                  </p>
                  <svg xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                      <linearGradient id='gradient'>
                        <stop offset='0%' stopColor='#902be7' />
                        <stop offset='100%' stopColor='#451371' />
                      </linearGradient>
                    </defs>
                    <circle className='progress-background' />
                    <circle className='progress-circle' />
                  </svg>
                </div>
                <div className='card-title'>
                  <div className='title-contain'>
                    {val.type == 'points' && <AiOutlineStar className='icon' />}
                    {val.type == 'months' && (
                      <AiOutlineHourglass className='icon' />
                    )}
                    {val.type == 'certificates' && <FaAward className='icon' />}
                    {val.type == 'points' && (
                      <p className='texts'>
                        <span className='main'>RECOMPENSAS</span>
                        <br />
                        por {val.scoreType}
                      </p>
                    )}
                    {val.type == 'months' && (
                      <p className='texts'>
                        <span className='main'>BENEFICIOS</span>
                        <br />
                        por {val.scoreType}
                      </p>
                    )}
                    {val.type == 'certificates' && (
                      <p className='texts'>
                        <span className='main'>CERTIFICADOS</span>
                        <br />
                        Completados
                      </p>
                    )}
                  </div>

                  <p className='texts'>
                    <span className='sub'>
                      {val.type == 'points' && val.score + ' puntos'}
                      {val.type == 'months'
                        ? val.score == 1
                          ? val.score + ' mes'
                          : val.score + ' meses'
                        : ''}
                      {val.type == 'certificates'
                        ? val.score == 1
                          ? val.score + ' certificado'
                          : val.score + ' certificados'
                        : ''}
                    </span>
                    <br />
                    {val.type == 'points' && 'en total'}
                    {val.type == 'months' &&
                      (val.score == 1 ? 'completado' : 'completados')}
                    {val.type == 'certificates' &&
                      (val.score == 1 ? 'completado' : 'completados')}
                  </p>
                </div>
                <div className='next-reward'>
                  <div className='container'>
                    <div className='icon-rewards'>
                      <FaPrescriptionBottleAlt />
                      <FaPrescriptionBottleAlt />
                    </div>
                    <p className='next-reward-title'>
                      {val.type == 'points' && (
                        <>
                          Siguiente recompensa
                          <br />
                        </>
                      )}
                      {val.type == 'months' && (
                        <>
                          Siguiente beneficio
                          <br />
                        </>
                      )}
                      {val.type == 'certificates' && (
                        <>
                          Siguiente certificado
                          <br />
                        </>
                      )}
                      <span>{val.title}</span>
                    </p>
                    <p className='next-reward-points'>
                      {val.type == 'points' && (
                        <>
                          {val.points !== 0 ? (
                            <>
                              al reunir
                              <br />
                            </>
                          ) : (
                            <>
                              Recompensas
                              <br />
                            </>
                          )}
                        </>
                      )}
                      {val.type == 'months' && (
                        <>
                          {val.months !== 0 ? (
                            <>
                              al completar
                              <br />
                            </>
                          ) : (
                            <>
                              Beneficios
                              <br />
                            </>
                          )}
                        </>
                      )}
                      {val.type == 'certificates' && (
                        <>
                          {val.title !== 'Sin certificados' ? (
                            <>
                              al completar
                              <br />
                            </>
                          ) : (
                            <>
                              Certificados
                              <br />
                            </>
                          )}
                        </>
                      )}
                      <span>
                        {val.type == 'points' && (
                          <>
                            {val.points !== 0
                              ? val.points + ' puntos'
                              : 'Completadas'}
                          </>
                        )}
                        {val.type == 'months' && (
                          <>
                            {val.months !== 0
                              ? val.months == 1
                                ? val.months + ' mes'
                                : val.months + ' meses'
                              : 'Completadas'}
                          </>
                        )}
                        {val.type == 'certificates' && (
                          <>
                            {val.title !== 'Sin certificados'
                              ? val.certificates !== 0
                                ? val.certificates === 1
                                  ? val.certificates + ' lección'
                                  : val.certificates + ' lecciones'
                                : 'las tareas'
                              : 'Completadas'}
                          </>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </RewardCardContainer>
            );
          })}
        </div>
      </RewardsTitle>
      <AllSlider>
        {allSlider.map((val: any, index: any) => {
          return (
            <RewardSlider
              key={'Slider Rewards ' + index}
              user={userData}
              score={userData.score}
              months={timeLevel}
              certificates={completeCertificates.length}
              rewards={rewards}
              type={val.type}
              innerWidth={innerWidth}
              indexSlider={index}
              userReward={userReward}
              getRewardData={getRewardData}
              courses={courses}
              completeCertificates={completeCertificates}
            />
          );
        })}
      </AllSlider>
    </RewardContainer>
  );
};
export default Rewards;
