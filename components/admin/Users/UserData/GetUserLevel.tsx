import React, { useEffect, useState } from "react";

import {
  CurrentLevel,
  LevelContain,
  OuterProgress,
  ProgressBackground,
  ProgressCircle,
  ProgressSvg,
  Vector,
  Vector2,
} from "../../../../containers/Profile/Rewards/UserLevel/UserLevel.styled";
import { db } from "../../../../firebase/firebaseConfig";
import { getLevel } from "../../../../store/actions/RewardActions";

interface LevelData {
  id: string;
  level?: number;
  maximum: number;
  minimum: number;
};

const GetUserLevel = ({ userLevel }: any) => {
  const [size, setSize] = useState(0);
  const [level, setLevel] = useState<LevelData>({ id: "", level: 0, maximum: 0, minimum: 0 });
  const [data, setData] = useState<number>(0)

  const getSize = async () => {
    db.collection('levelPoints').get().then(snap => {
      setSize(snap.size) // will return the collection size
    });
  }
  const getCurrentLevel = () => {
    getLevel().then((res: Array<LevelData>) => {
      const response = res.filter((data: any) => (data.maximum >= userLevel.score && data.minimum <= userLevel.score) || data.level == size)[0] ?? { id: "", level: 1, maximum: 0, minimum: 0 }
      setLevel(response)
    })
  }
  useEffect(() => {
    if (userLevel != null) {
      getCurrentLevel();
      getSize();
    }
  }, [userLevel, size]);

  useEffect(() => {
    if (userLevel != null && level != null) {
      setData(157 - (((userLevel.score - level.minimum) / (level.maximum - level.minimum)) * 157));
    }
  }, [level])

  return (
    <OuterProgress>
      <LevelContain>
        <CurrentLevel>
          {level.level}
        </CurrentLevel>
        <Vector />
        <Vector2 />
      </LevelContain>
      <ProgressSvg
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient2">
            <stop offset="0%" stopColor="#8E2DE2" />
            <stop offset="100%" stopColor="#4A00E0" />
          </linearGradient>
        </defs>
        <ProgressBackground
          cx="27px"
          cy="27px"
          r="25px"
        />
        <ProgressCircle
          cx="27px"
          cy="27px"
          r="25px"
          progress={data}
        />
      </ProgressSvg>
    </OuterProgress>
  )
}
export default GetUserLevel;