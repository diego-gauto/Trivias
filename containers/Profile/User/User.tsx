
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { LoaderContain, LoaderImage, Background } from "../../../screens/Login.styled";

import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import {
  BackgroundProfile,
  LogOut,
  LogOutIcon,
  SecondBox,
  ThirdBox,
} from "../../Profile/User/User.styled";
import NextReward from "./NextReward";
import PaymentMethod from "./PaymentMethod";
import UserData from "./UserData";
import UserInfo from "./UserInfo";
import { getPaymentmethods } from "../../../store/actions/PaymentActions";

const User = () => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [level, setLevel] = useState<any>([]);
  const [barProgress, setBarProgress] = useState(0);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const levelRef = query(collection(db, "levelPoints"), orderBy("level"));
  const [paymentMethod, setPaymentMethods] = useState<any>([]);

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    console.log(error)

    setLoggedIn(false)
  }

  const fetchDB_data = async () => {
    try {
      let temp_pm: any = []
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        response.forEach((e) => {
          getPaymentmethods(e.id).then((res: any) => {
            temp_pm = res;
            res.forEach((element: any) => {
              if (e.data().membership.paymentMethod == element.cardId) {
                element.default = true;
              } else {
                element.default = false;
              }
            });
            setPaymentMethods(res);
            temp_pm = temp_pm.filter((x: any) => x.cardId == e.data().membership.paymentMethod);
            if (temp_pm.length > 0) {
              setUserData({ ...e.data(), id: e.id, membership: { ...e.data().membership, brand: temp_pm[0].brand, last4: temp_pm[0].last4 } });
            } else {
              setUserData({ ...e.data(), id: e.id });
            }

          })
        });
      })
    } catch (error) {
      return false
    }
  }
  const getSize = async () => {
    db.collection('levelPoints').get().then(snap => {
      setSize(snap.size) // will return the collection size
    });
  }

  const getLevel = async () => {
    let tempData: any = []
    const data = await getDocs(levelRef)
    data.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id })
    })
    tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score) || (data.level == size))
    setLevel(tempData[0])
  }

  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };
  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  useEffect(() => {
    if (userData != null) {
      getLevel();
      getSize();
    }
  }, [userData, size]);
  useEffect(() => {
    if (userData != null && level != null) {
      setBarProgress(((userData.score - level.minimum) / (level.maximum - level.minimum)) * 100)
      setLoading(false);
    }
  }, [level]);

  if (loading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }
  return (
    <BackgroundProfile>
      {/* FIRST BOX */}
      {//Vista del navbar dinamico de Homepage
        userData !== null
          ?
          <UserInfo userData={userData} /> : <></>}
      {/* SECOND Container */}
      <SecondBox>
        <NextReward score={userData.score} barProgress={barProgress} level={level.level} max={level.maximum} />
        <ThirdBox>
          {/* Third Container */}
          <UserData data={userData} pm={paymentMethod} />
          {/* Fourth Container */}
          <PaymentMethod data={userData} pm={paymentMethod} />
        </ThirdBox>
      </SecondBox>
      <Link href="/">
        <LogOut onClick={logoutFunc} style={{
          display: responsive1023 ? "" : "none",
          marginTop: "-5%",
        }}>
          Cerrar Sesión
          <LogOutIcon />
        </LogOut>
      </Link>
    </BackgroundProfile>
  )
}
export default User;