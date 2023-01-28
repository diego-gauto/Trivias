import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";

import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Container, Text } from "./SideBar.styled";

const SideBar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();
  const [isPay, setIsPay] = useState<boolean>();
  const [isCourses, setIsCourses] = useState<boolean>();
  const [isCategory, setIsCategory] = useState<boolean>();
  const [isRewards, setIsRewards] = useState<boolean>();
  const [isLanding, setIsLanding] = useState<boolean>();
  const [isCoupons, setIsCoupons] = useState<boolean>();
  const [isUsers, setIsUsers] = useState<boolean>();
  const [index, setIndex] = useState(0)
  const [section, setSection] = useState(0)
  try {
    var userDataAuth = useAuth();
    if (!userDataAuth.user) {
      router.push({
        pathname: '/',
      });
    }
    useEffect(() => {
      const fetchDB_data = async () => {
        try {
          const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
          return onSnapshot(query_1, (response) => {
            var adminData: any;
            response.forEach((e) => {
              if (e.data().role == "user") {
                router.push({
                  pathname: '/Preview',
                });
              }
              adminData = e.data()
            });
            setIsPay(adminData.adminType.pay);
            setIsCourses(adminData.adminType.courses);
            setIsRewards(adminData.adminType.rewards);
            setIsLanding(adminData.adminType.landing);
            setIsCoupons(adminData.adminType.coupons);
            setIsCategory(adminData.adminType.category);
            setIsUsers(adminData.adminType.users);
            if (adminData.adminType.superAdmin) {
              setIsSuperAdmin(true)
            }
            return adminData;
          })
        } catch (error) {
          return false;
        }
      }
      fetchDB_data();
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Courses") {
        setIndex(0)
      } if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Landing") {
        setIndex(1)
      } if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Rewards") {
        setIndex(2)
      } if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Coupons") {
        setIndex(3)
      } if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Pago") {
        setIndex(4)
      } if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Users") {
        setIndex(5)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "HomeWork") {
        setIndex(6)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Sections") {
        setIndex(7)
      }
    }, [])

  } catch (error) {
  }

  const set = (idx: number) => {
    setIndex(idx)
  }

  return (

    <Container>
      {isSuperAdmin &&
        <>
          <div className="tab" style={{ whiteSpace: "pre" }}>
            <Text>Learning Products</Text>
            <ul>
              <Link href="/admin/Courses">
                <li style={{ color: index == 0 ? "#ffa500" : "#fff" }} onClick={() => {
                  setIndex(0)
                }}>Courses</li>
              </Link>
              <Link href="/admin/Landing">
                <li style={{ color: index == 1 ? "#ffa500" : "#fff" }} onClick={() => {
                  setIndex(1)
                }}>Landing</li>
              </Link>
              <Link href="/admin/Rewards">
                <li style={{ color: index == 2 ? "#ffa500" : "#fff" }} onClick={() => {
                  setIndex(2)
                }}>Rewards</li>
              </Link>
            </ul>
            <Text>Market & Sell</Text>
            <ul>
              <Link href="/admin/Coupons">
                <li style={{ color: index == 3 ? "#ffa500" : "#fff" }}>Coupons</li>
              </Link>
              <Link href="/admin/Pago">
                <li style={{ color: index == 4 ? "#ffa500" : "#fff" }}>Orders</li>
              </Link>
            </ul>
            <Text>Support Your Students</Text>
            <ul>
              <Link href="/admin/Users">
                <li style={{ color: index == 5 ? "#ffa500" : "#fff" }}>Users</li>
              </Link>
              <Link href="/admin/HomeWork">
                <li style={{ color: index == 6 ? "#ffa500" : "#fff" }}>Assigments</li>
              </Link>
            </ul>
            <Text>Organization</Text>
            <ul>
              <Link href="/admin/Sections">
                <li style={{ color: index == 7 ? "#ffa500" : "#fff" }}>Team Members</li>
              </Link>
            </ul>
          </div>
        </>
      }
      {!isSuperAdmin &&
        <>
          {isPay &&
            <Link href="/admin/Pago">
              <Text>Pagos</Text>
            </Link>
          }
          {isCourses &&
            <Link href="/admin/Courses">
              <Text>Cursos</Text>
            </Link>
          }
          {isCategory &&
            <Link href="/admin/Courses">
              <Text>Categorias</Text>
            </Link>
          }
          {isRewards &&
            <Link href="/admin/Rewards">
              <Text>Recompensas</Text>
            </Link>
          }
          {isLanding &&
            <Link href="/admin/Landing">
              <Text>Landing</Text>
            </Link>
          }
          {isCoupons &&
            <Link href="/admin/Coupons">
              <Text>Cupones</Text>
            </Link>
          }
          {isUsers &&
            <Link href="/admin/Users">
              <Text>Usuarios</Text>
            </Link>
          }

        </>
      }
    </Container>
  )
}
export default SideBar;