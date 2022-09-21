import { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Container, Text } from "./SideBar.styled";
import router from "next/router";

const SideBar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();
  const [isGeneral, setIsGeneral] = useState<boolean>();
  const [isPay, setIsPay] = useState<boolean>();
  const [isCourses, setIsCourses] = useState<boolean>();
  const [isRewards, setIsRewards] = useState<boolean>();
  const [isLanding, setIsLanding] = useState<boolean>();
  const [isCoupons, setIsCoupons] = useState<boolean>();
  const [isUsers, setIsUsers] = useState<boolean>();
  try {
    var userDataAuth = useAuth();
    if (!userDataAuth.user) {
      router.push({
        pathname: '/Preview',
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
            setIsGeneral(adminData.adminType.general);
            setIsPay(adminData.adminType.pay);
            setIsCourses(adminData.adminType.courses);
            setIsRewards(adminData.adminType.rewards);
            setIsLanding(adminData.adminType.landing);
            setIsCoupons(adminData.adminType.coupons);
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
    }, [])

  } catch (error) {
  }

  return (

    <Container>
      {isSuperAdmin &&
        <>
          <Link href="/admin/General">
            <Text>General</Text>
          </Link><Link href="/admin/Pago">
            <Text>Pagos</Text>
          </Link><Link href="/admin/Courses">
            <Text>Cursos</Text>
          </Link><Link href="/admin/Rewards">
            <Text>Recompensas</Text>
          </Link><Link href="/admin/Landing">
            <Text>Landing</Text>
          </Link><Link href="/admin/Coupons">
            <Text>Cupones</Text>
          </Link><Link href="/admin/Users">
            <Text>Usuarios</Text>
          </Link><Link href="/admin/Sections">
            <Text>Secciones</Text>
          </Link>
        </>
      }
      {!isSuperAdmin &&
        <>
          {isGeneral &&
            <Link href="/admin/General">
              <Text>General</Text>
            </Link>
          }
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