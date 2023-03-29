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
  const [userData, setUserData] = useState<any>(null);

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.courses) setIsCourses(true);
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.coupons) setIsCoupons(true);
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.landing) setIsLanding(true);
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.pay) setIsPay(true);
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.rewards) setIsRewards(true);
        if (userDataAuth.user.role === 'admin' && userDataAuth.user.users) setIsUsers(true);
        setUserData(userDataAuth.user);
        if (userDataAuth.user.role === 'superAdmin') {
          setIsSuperAdmin(true);
        }
      }
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
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Blog") {
        setIndex(7)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Sections") {
        setIndex(8)
      }
    }, [])
  } catch (error) {
  }

  useEffect(() => {
    if (userData !== null) {
      if (userData.role == "admin") {
        if (router.pathname == "/admin/Courses" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Pago" && userData.pay == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Coupons" && userData.coupons == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Landing" && userData.landing == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Rewards" && userData.rewards == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Users" && userData.users == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Edit" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/EditLesson" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Teacher" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Materials" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/CourseAtributes" && userData.courses == false) {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
        if (router.pathname == "/admin/Sections") {
          setIndex(6)
          router.push({ pathname: "/admin/HomeWork" })
        }
      }
    }
  }, [userData])

  return (
    <Container>
      <div className="tab" style={{ whiteSpace: "pre" }}>
        <Text>Learning Products</Text>
        <ul>
          {(isSuperAdmin || isCourses) && <Link href="/admin/Courses">
            <li style={{ color: index == 0 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(0)
            }}>Courses</li>
          </Link>}
          {(isSuperAdmin || isLanding) && <Link href="/admin/Landing">
            <li style={{ color: index == 1 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(1)
            }}>Landing</li>
          </Link>}
          {(isSuperAdmin || isRewards) && <Link href="/admin/Rewards">
            <li style={{ color: index == 2 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(2)
            }}>Rewards</li>
          </Link>}
        </ul>
        <Text>Market & Sell</Text>
        <ul>
          {(isSuperAdmin || isCoupons) && <Link href="/admin/Coupons">
            <li style={{ color: index == 3 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(3)
            }}>Coupons</li>
          </Link>}
          {(isSuperAdmin || isPay) && <Link href="/admin/Pago">
            <li style={{ color: index == 4 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(4)
            }}>Orders</li>
          </Link>}
        </ul>
        <Text>Support Your Students</Text>
        <ul>
          {(isSuperAdmin || isUsers) && <Link href="/admin/Users">
            <li style={{ color: index == 5 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(5)
            }}>Users</li>
          </Link>}
          <Link href="/admin/HomeWork">
            <li style={{ color: index == 6 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(6)
            }}>Assigments</li>
          </Link>
          <Link href="/admin/Blog">
            <li style={{ color: index == 7 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(7)
            }}>Blogs</li>
          </Link>
        </ul>
        <Text>Organization</Text>
        {isSuperAdmin && <ul>
          <Link href="/admin/Sections">
            <li style={{ color: index == 8 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(8)
            }}>Team Members</li>
          </Link>
        </ul>}
      </div>
    </Container>
  )
}
export default SideBar;