import { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";

import Link from "next/link";
import router from "next/router";

import { useAuth } from "../../hooks/useAuth";
import { Container, Text } from "./SideBar.styled";

const SideBar = ({ show, onHide }: any) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();
  const [isPay, setIsPay] = useState<boolean>();
  const [isCourses, setIsCourses] = useState<boolean>();
  const [isBlogs, setIsBlogs] = useState<boolean>();
  const [isHomeworks, setIsHomeworks] = useState<boolean>();
  const [isRewards, setIsRewards] = useState<boolean>();
  const [isLanding, setIsLanding] = useState<boolean>();
  const [isCoupons, setIsCoupons] = useState<boolean>();
  const [isUsers, setIsUsers] = useState<boolean>();
  const [isTrivias, setIsTrivias] = useState<boolean>();
  const [isForms, setIsForms] = useState<boolean>();
  const [isComments, setIsComments] = useState<boolean>();
  const [index, setIndex] = useState(0)
  const [section, setSection] = useState(0)
  const [userData, setUserData] = useState<any>(null);

  const changeValue = (value: any) => {
    if (value === 0) return false;
    if (value === 1) return true;
    else return
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        let user = userDataAuth.user;
        if (user.role === "user") {
          router.push({ pathname: "/" });
        }
        user.roles.forEach((role: any) => {
          if (role.role === "course" && changeValue(role.view)) setIsCourses(true);
          if (role.role === "landing" && changeValue(role.view)) setIsLanding(true);
          if (role.role === "rewards" && changeValue(role.view)) setIsRewards(true);
          if (role.role === "users" && changeValue(role.view)) setIsUsers(true);
          if (role.role === "payments" && changeValue(role.view)) setIsPay(true);
          if (role.role === "coupons" && changeValue(role.view)) setIsCoupons(true);
          if (role.role === "homeworks" && changeValue(role.view)) setIsHomeworks(true);
          if (role.role === "blogs" && changeValue(role.view)) setIsBlogs(true);
          if (role.role === "comments" && changeValue(role.view)) setIsComments(true);
        });
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
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Comments") {
        setIndex(9)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Trivias") {
        setIndex(11)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Cancel") {
        setIndex(10)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Pause") {
        setIndex(12)
      }
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "Forms") {
        setIndex(13)
      }
    }, [])
  } catch (error) {
  }

  useEffect(() => {
    if (userData !== null) {
      if (userData.role == "admin") {
        if (router.pathname == "/admin/Courses" && userData.roles[0].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Pago" && userData.roles[6].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Coupons" && userData.roles[1].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Landing" && userData.roles[5].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Rewards" && userData.roles[3].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Users" && userData.roles[4].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Blog" && userData.roles[2].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/HomeWork" && userData.roles[7].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Comments" && userData.roles[8].view == 0) {
          router.push({ pathname: "/" });
        }
        if (router.pathname == "/admin/Sections") {
          router.push({ pathname: "/" });
        }
      }
    }
  }, [userData])

  return (
    <Container show={show}>
      <IoClose className="close-admin-menu" onClick={onHide} />
      <div className="tab" style={{ whiteSpace: "pre" }}>
        <Text>Learning Products</Text>
        <ul>
          {(isSuperAdmin || isCourses) && <Link href="/admin/Courses">
            <li style={{ color: index == 0 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(0)
              onHide()
            }}>Courses</li>
          </Link>}
          {(isSuperAdmin || isLanding) && <Link href="/admin/Landing">
            <li style={{ color: index == 1 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(1)
              onHide()
            }}>Landing</li>
          </Link>}
          {(isSuperAdmin || isRewards) && <Link href="/admin/Rewards">
            <li style={{ color: index == 2 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(2)
              onHide()
            }}>Rewards</li>
          </Link>}
        </ul>
        <Text>Market & Sell</Text>
        <ul>
          {(isSuperAdmin || isCoupons) && <Link href="/admin/Coupons">
            <li style={{ color: index == 3 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(3)
              onHide()
            }}>Coupons</li>
          </Link>}
          {(isSuperAdmin || isPay) && <Link href="/admin/Pago">
            <li style={{ color: index == 4 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(4)
              onHide()
            }}>Orders</li>
          </Link>}
        </ul>
        <Text>Support Your Students</Text>
        <ul>
          {(isSuperAdmin || isUsers) && <Link href="/admin/Users">
            <li style={{ color: index == 5 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(5)
              onHide()
            }}>Users</li>
          </Link>}
          {/* {(isSuperAdmin || isUsers) && <Link href="/admin/Pause">
            <li style={{ color: index == 12 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(11)
              onHide()
            }}>Pause Review</li>
          </Link>} */}
          {(isSuperAdmin || isUsers) && <Link href="/admin/Cancel">
            <li style={{ color: index == 10 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(10)
              onHide()
            }}>Cancel Review</li>
          </Link>}
          {(isSuperAdmin || isHomeworks) && <Link href="/admin/HomeWork">
            <li style={{ color: index == 6 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(6)
              onHide()
            }}>Assigments</li>
          </Link>}
          {(isSuperAdmin || isHomeworks) && <Link href="/admin/Comments">
            <li style={{ color: index == 9 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(9)
              onHide()
            }}>Comments</li>
          </Link>}
          {(isSuperAdmin || isBlogs) && <Link href="/admin/Blog">
            <li style={{ color: index == 7 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(7)
              onHide()
            }}>Blogs</li>
          </Link>}
          {(isSuperAdmin || isTrivias) && <Link href="/admin/Trivias">
            <li style={{ color: index == 11 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(11)
              onHide()
            }}>Trivias</li>
          </Link>}
          {(isSuperAdmin || isForms) && <Link href="/admin/Forms">
            <li style={{ color: index == 13 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(13)
              onHide()
            }}>Forms</li>
          </Link>}
          {(isSuperAdmin || isForms) && <Link href="/admin/Tickets">
            <li style={{ color: index == 14 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(14)
              onHide()
            }}>Tickets</li>
          </Link>}
        </ul>
        <Text>Organization</Text>
        {isSuperAdmin && <ul>
          <Link href="/admin/Sections">
            <li style={{ color: index == 8 ? "#ffa500" : "#fff" }} onClick={() => {
              setIndex(8)
              onHide()
            }}>Team Members</li>
          </Link>
        </ul>}
      </div>
    </Container>
  )
}
export default SideBar;