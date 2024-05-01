import { IUserReward } from './IRewardSlider';

export const showScoreText = (mainText: string, rewardPoints: number) => {
  if (rewardPoints) {
    return mainText + ' ' + rewardPoints + ' puntos';
  } else {
    return mainText;
  }
};
export const showMonthText = (
  mainText: string,
  rewardMonth: number,
  rewardType: string,
) => {
  if (rewardMonth && rewardMonth > 0) {
    return (
      mainText +
      ' ' +
      (rewardMonth === 1 ? rewardMonth + ' mes' : rewardMonth + ' meses')
    );
  }
  if (rewardMonth === 0) {
    if (rewardType === 'months') {
      return 'hasta adquirir Gonvar+';
    }
    if (rewardType === 'claim-months') {
      return 'por ser alumna Gonvar+';
    }
  }
  if (rewardMonth === -1) {
    if (rewardType === 'months') {
      return 'hasta adquirir Gonvar+';
    }
    if (rewardType === 'claim-months') {
      return 'por ser alumna Gonvar+';
    }
  }
  return '';
};
export const showLessonText = (
  mainText: string,
  rewardLessons: number,
  rewardType: string,
) => {
  if (rewardLessons) {
    return (
      mainText +
      ' ' +
      (rewardLessons === 1
        ? rewardLessons + ' lección'
        : rewardLessons + ' lecciones')
    );
  } else {
    if (rewardType === 'certificates') {
      return mainText + ' las tareas faltantes';
    } else {
      return mainText;
    }
  }
};
export const checkCurrentDay = () => {
  let today = new Date().getDate();
  if (1 <= today && today <= 10) {
    return true;
  } else {
    return false;
  }
};
export const checkIfClaimed = (userRewards: IUserReward[], reward: any) => {
  let today = new Date().getMonth() + 1;
  let checkArray = userRewards.filter(
    (val: IUserReward) => val.reward_id === reward.id,
  );
  let finalArray = checkArray.filter(
    (val: IUserReward) => today === new Date(val.created_at).getMonth() + 1,
  );
  if (finalArray.length === 0) {
    return true;
  } else {
    return false;
  }
};
