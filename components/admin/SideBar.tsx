import { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Container, Text } from "./SideBar.styled";

const SideBar = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      const fetchDB_data = async () => {
        try {
          const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
          return onSnapshot(query_1, (response) => {
            var adminData: any;
            response.forEach((e) => {
              adminData = e.data()
            });
            if (adminData.role == "superAdmin") {
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
    console.log(error)
  }

  return (

    <Container>
      <Link href="/admin/General">
        <Text>General</Text>
      </Link>
      <Link href="/admin/Pago">
        <Text>Pagos</Text>
      </Link>
      <Link href="/admin/Courses">
        <Text>Cursos</Text>
      </Link>
      <Link href="/admin/Rewards">
        <Text>Recompensas</Text>
      </Link>
      <Link href="/admin/Landing">
        <Text>Landing</Text>
      </Link>
      <Link href="/admin/Coupons">
        <Text>Cupones</Text>
      </Link>
      <Link href="/admin/Users">
        <Text>Usuarios</Text>
      </Link>
      {isSuperAdmin &&
        <Link href="/admin/Sections">
          <Text>Secciones</Text>
        </Link>
      }
    </Container>
  )
}
export default SideBar;