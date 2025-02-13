import { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";

import Link from "next/link";
import router from "next/router";

import { useAuth } from "../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../screens/Login.styled";
import { Container, Text } from "./SideBar.styled";
import { IUserData } from './UserData';

const SideBar = ({ show, onHide }: any) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isPay, setIsPay] = useState<boolean>(false);
  const [isCourses, setIsCourses] = useState<boolean>(false);
  const [isBlogs, setIsBlogs] = useState<boolean>(false);
  const [isHomeworks, setIsHomeworks] = useState<boolean>(false);
  const [isRewards, setIsRewards] = useState<boolean>(false);
  const [isLanding, setIsLanding] = useState<boolean>(false);
  const [isCoupons, setIsCoupons] = useState<boolean>(false);
  const [isUsers, setIsUsers] = useState<boolean>(false);
  const [isTrivias, setIsTrivias] = useState<boolean>(false);
  const [isTriviasList, setIsTriviasList] = useState<boolean>(false);
  const [isForms, setIsForms] = useState<boolean>(false);
  const [isFormsList, setIsFormsList] = useState<boolean>(false);
  const [isTicketsList, setIsTicketsList] = useState<boolean>(false);
  const [isMembershipsList, setIsMembershipsList] = useState<boolean>(false);
  const [isComments, setIsComments] = useState<boolean>(false);
  const [isSubscriptions, setIsSubscriptions] = useState<boolean>(false);
  const [isActiveMemberships, setIsActiveMemberships] = useState<boolean>(false);
  const [isDistributors, setIsDistributors] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);

  const changeValue = (value: string) => {
    return value === '1';
  };

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        let user: IUserData = userDataAuth.user;
        if (user.role === 'user') {
          router.push({ pathname: '/' });
        }
        if (user.roles.length === 0 && user.role !== 'superAdmin') {
          router.push({ pathname: '/' });
        }
        user.roles.forEach((role) => {
          if (role.role === 'course' && changeValue(role.view))
            setIsCourses(true);
          if (role.role === 'landing' && changeValue(role.view))
            setIsLanding(true);
          if (role.role === 'rewards' && changeValue(role.view))
            setIsRewards(true);
          if (role.role === 'users' && changeValue(role.view)) setIsUsers(true);
          if (role.role === 'payments' && changeValue(role.view))
            setIsPay(true);
          if (role.role === 'coupons' && changeValue(role.view))
            setIsCoupons(true);
          if (role.role === 'homeworks' && changeValue(role.view))
            setIsHomeworks(true);
          if (role.role === 'blogs' && changeValue(role.view)) setIsBlogs(true);
          if (role.role === 'comments' && changeValue(role.view))
            setIsComments(true);
          if (role.role === 'trivias' && changeValue(role.view))
            setIsTrivias(true);
          if (role.role === 'trivias_list' && changeValue(role.view))
            setIsTriviasList(true);
          if (role.role === 'forms' && changeValue(role.view)) setIsForms(true);
          if (role.role === 'forms_list' && changeValue(role.view))
            setIsFormsList(true);
          if (role.role === 'tickets_list' && changeValue(role.view))
            setIsTicketsList(true);
          if (role.role === 'memberships_list' && changeValue(role.view))
            setIsMembershipsList(true);
          // setIsSubscriptions
          if (role.role === 'subscriptions' && changeValue(role.view))
            setIsSubscriptions(true);
          if (role.role === 'active_memberships' && changeValue(role.view))
            setIsActiveMemberships(true);
          if (role.role === 'distributors' && changeValue(role.view))
            setIsDistributors(true);
        });
        setUserData(userDataAuth.user);
        setLoading(false);
        if (userDataAuth.user.role === 'superAdmin') {
          setIsSuperAdmin(true);
        }
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Courses'
      ) {
        setIndex(0);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Landing'
      ) {
        setIndex(1);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Rewards'
      ) {
        setIndex(2);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Coupons'
      ) {
        setIndex(3);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Pago'
      ) {
        setIndex(4);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Users'
      ) {
        setIndex(5);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'HomeWork'
      ) {
        setIndex(6);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Blog'
      ) {
        setIndex(7);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Sections'
      ) {
        setIndex(8);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Comments'
      ) {
        setIndex(9);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Trivias'
      ) {
        setIndex(11);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Cancel'
      ) {
        setIndex(10);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Pause'
      ) {
        setIndex(12);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Forms'
      ) {
        setIndex(13);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Tickets'
      ) {
        setIndex(14);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Memberships'
      ) {
        setIndex(15);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'PlansLinks'
      ) {
        setIndex(16);
      }
      if (
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf('/') + 1,
        ) == 'Distributors'
      ) {
        setIndex(20);
      }
    }, []);
  } catch (error) { }

  useEffect(() => {

  }, []);

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
    <Container show={show}>
      <IoClose className='close-admin-menu' onClick={onHide} />
      <div className='tab' style={{ whiteSpace: 'pre' }}>
        {(isSuperAdmin || isCourses || isLanding || isRewards) && (
          <Text>Learning Products</Text>
        )}
        <ul>
          {(isSuperAdmin || isCourses) && (
            <Link href='/admin/Courses'>
              <li
                style={{ color: index == 0 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(0);
                  onHide();
                }}
              >
                Courses
              </li>
            </Link>
          )}
          {(isSuperAdmin || isLanding) && (
            <Link href='/admin/Landing'>
              <li
                style={{ color: index == 1 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(1);
                  onHide();
                }}
              >
                Landing
              </li>
            </Link>
          )}
          {(isSuperAdmin || isRewards) && (
            <Link href='/admin/Rewards'>
              <li
                style={{ color: index == 2 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(2);
                  onHide();
                }}
              >
                Rewards
              </li>
            </Link>
          )}
        </ul>
        {(isSuperAdmin || isCoupons || isPay) && <Text>Market & Sell</Text>}
        <ul>
          {(isSuperAdmin || isCoupons) && (
            <Link href='/admin/Coupons'>
              <li
                style={{ color: index == 3 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(3);
                  onHide();
                }}
              >
                Coupons
              </li>
            </Link>
          )}
          {(isSuperAdmin || isPay) && (
            <Link href='/admin/Pago'>
              <li
                style={{ color: index == 4 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(4);
                  onHide();
                }}
              >
                Orders
              </li>
            </Link>
          )}
        </ul>
        {(isSuperAdmin ||
          isUsers ||
          isHomeworks ||
          isComments ||
          isBlogs ||
          isTrivias ||
          isTriviasList ||
          isForms ||
          isFormsList ||
          isTicketsList ||
          isMembershipsList) && <Text>Support Your Students</Text>}
        <ul>
          {(isSuperAdmin || isUsers) && (
            <Link href='/admin/Users'>
              <li
                style={{ color: index == 5 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(5);
                  onHide();
                }}
              >
                Users
              </li>
            </Link>
          )}
          {isSuperAdmin && (
            <Link href='/admin/Cancel'>
              <li
                style={{ color: index == 10 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(10);
                  onHide();
                }}
              >
                Cancel Review
              </li>
            </Link>
          )}
          {(isSuperAdmin || isHomeworks) && (
            <Link href='/admin/HomeWork'>
              <li
                style={{ color: index == 6 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(6);
                  onHide();
                }}
              >
                Assigments
              </li>
            </Link>
          )}
          {(isSuperAdmin || isComments) && (
            <Link href='/admin/Comments'>
              <li
                style={{ color: index == 9 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(9);
                  onHide();
                }}
              >
                Comments
              </li>
            </Link>
          )}
          {(isSuperAdmin || isBlogs) && (
            <Link href='/admin/Blog'>
              <li
                style={{ color: index == 7 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(7);
                  onHide();
                }}
              >
                Blogs
              </li>
            </Link>
          )}
          {(isSuperAdmin || isTrivias || isTriviasList) && (
            <Link href='/admin/Trivias'>
              <li
                style={{ color: index == 11 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(11);
                  onHide();
                }}
              >
                Trivias
              </li>
            </Link>
          )}
          {(isSuperAdmin || isForms || isFormsList) && (
            <Link href='/admin/Forms'>
              <li
                style={{ color: index == 13 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(13);
                  onHide();
                }}
              >
                Forms
              </li>
            </Link>
          )}
          {(isSuperAdmin || isTicketsList) && (
            <Link href='/admin/Tickets'>
              <li
                style={{ color: index == 14 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(14);
                  onHide();
                }}
              >
                Tickets
              </li>
            </Link>
          )}
          {(isSuperAdmin || isMembershipsList) && (
            <Link href='/admin/Memberships'>
              <li
                style={{ color: index == 15 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(15);
                  onHide();
                }}
              >
                Memberships
              </li>
            </Link>
          )}
          {(isSuperAdmin || isUsers) && (
            <Link href='/admin/Plans'>
              <li
                style={{ color: index == 16 ? '#ffa500' : '#fff' }}
                onClick={() => {
                  setIndex(16);
                  onHide();
                }}
              >
                Plans links
              </li>
            </Link>
          )}
        </ul>
        {isSuperAdmin && (
          <>
            <Text>Organization</Text>
            <ul>
              <Link href='/admin/Sections'>
                <li
                  style={{ color: index == 8 ? '#ffa500' : '#fff' }}
                  onClick={() => {
                    setIndex(8);
                    onHide();
                  }}
                >
                  Team Members
                </li>
              </Link>
            </ul>
          </>
        )}
        {
          (isSuperAdmin || isDistributors) && (
            <>
              <Text>Distributors</Text>
              <ul>
                <Link href='/admin/Distributors'>
                  <li
                    style={{ color: index == 20 ? '#ffa500' : '#fff' }}
                    onClick={() => {
                      setIndex(20);
                      onHide();
                    }}
                  >
                    Distributors
                  </li>
                </Link>
              </ul>
            </>
          )
        }
        {(isSuperAdmin || (isSubscriptions || isActiveMemberships)) && (
          <>
            <Text>Statistics</Text>
            <ul>
              {
                (isSuperAdmin || isSubscriptions) &&
                <Link href='/admin/SuscriptionStats'>
                  <li
                    style={{ color: index == 18 ? '#ffa500' : '#fff' }}
                    onClick={() => {
                      setIndex(18);
                      onHide();
                    }}
                  >
                    Subscriptions
                  </li>
                </Link>
              }
              {
                (isSuperAdmin || isActiveMemberships) &&
                <Link href='/admin/MembershipStats'>
                  <li
                    style={{ color: index == 19 ? '#ffa500' : '#fff' }}
                    onClick={() => {
                      setIndex(19);
                      onHide();
                    }}
                  >
                    Active Memberships
                  </li>
                </Link>
              }
            </ul>
          </>
        )}
        {isSuperAdmin && (
          <>
            <Text>Testing</Text>
            <ul>
              <Link href='/admin/Twilio'>
                <li
                  style={{ color: index == 17 ? '#ffa500' : '#fff' }}
                  onClick={() => {
                    setIndex(17);
                    onHide();
                  }}
                >
                  Twilio
                </li>
              </Link>
            </ul>
          </>
        )}
      </div>
    </Container>
  );
};
export default SideBar;
