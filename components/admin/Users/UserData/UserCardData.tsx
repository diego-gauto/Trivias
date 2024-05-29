import { CSSProperties, useEffect, useState } from 'react';
import Modal1 from './Modal/Modal';
import ModalAddDays from './Modal/ModalAddDays';
import ModalRemoveSubscription from './Modal/ModalRemoveSubscription';
import ModalAddSubscriptionPlan from './Modal/ModalAddSubscriptionPlan';
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  CourseContain,
  FirstBox,
  Info,
  Label,
  ProfileContain,
  Title,
  TitleBox,
  TitleContain,
  TransparentButton,
  UserContain,
  UserInfo,
} from './UsersCardData.styled';
import ErrorModal from '../../../Error/ErrorModal';
import { AdminLoader } from '../../SideBar.styled';
import { Modal } from 'react-bootstrap';
import { getGenericQueryResponse, getLessonFromUserApi } from '../../../api/admin';
import { UserLevelValue } from '../../../GenericQueries/UserRoles/UserRolesInterfaces';

interface CardData {
  currentUser: any;
  isVisible: any;
  setIsVisible: (open: boolean) => void;
  courses: Array<any>;
  openUserCardData: any;
  canEdit: boolean;
  userLevel: UserLevelValue;
  adminUserId: number;
}

export interface IUserWithMembership {
  id: number;
  level: number;
  name: string;
  country: string;
  come_from: string;
  last_name: string;
  last_sign_in: string;
  photo: string;
  role: string;
  final_date: number;
  start_date: number;
  email: string;
  score: number;
  created_at: string;
  phone_number: string;
  plan_name: string;
  spent: number;
  method: string;
  user_courses: any[];
  admin_update_id?: number;
}

const getAdminUserInfoQuery = (userId: number) => {
  return `select concat(name, ' ', last_name) as name from users where id = ${userId}`;
}

const UserCardData = (props: CardData) => {
  const {
    currentUser,
    setIsVisible,
    courses,
    openUserCardData,
    isVisible,
    canEdit,
    userLevel,
    adminUserId
  } = props;
  const [show, setShow] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [showAddSubscriptionPlan, setShowAddSubscriptionPlan] = useState(false);
  const [showRemoveSuscription, setShowRemoveSuscription] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<IUserWithMembership>(currentUser);
  const [updateAdminName, setUpdateAdminName] = useState<string | undefined>(undefined);
  const GonvarImg = '/images/purchase/logo.png';
  let today = new Date().getTime() / 1000;
  const handleCourse = () => {
    // getUserCourses();
  };
  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime() + 50400000;
    return new Date(tempDate).toLocaleDateString('es-MX');
  };
  const secondsToDate = (value: any) => {
    let tempDate = new Date(value * 1000);
    return new Date(tempDate).toLocaleDateString('es-MX');
  };
  const deleteUser = () => {
    setError(true);
  };
  const getData = async () => {
    setLoader(false);
    const lessonUser = await getLessonFromUserApi(currentUser.id);
    lessonUser.data.data.map((userCourse: any) => {
      courses.forEach((course: any) => {
        if (userCourse.course_id === course.id) {
          userCourse.courseTitle = course.title;
          userCourse.image = course.image;
        }
      });
    });
    user.user_courses = lessonUser.data.data;
    console.log(user);
    setUser(user);
    setLoader(true);
  };
  const getAdminUpdateApi = async () => {
    try {
      const query = getAdminUserInfoQuery(user.admin_update_id || 0);
      const response = await getGenericQueryResponse(query);
      const data = response.data.data;
      const result = data.length > 0 ? data[0]['name'] : undefined;
      setUpdateAdminName(result || 'Desconocido');
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (currentUser) {
      getData();
      getAdminUpdateApi();
    }
  }, [currentUser]);

  if (!loader) {
    return (
      <AdminLoader style={{ position: 'absolute' }}>
        <div className='loader-image'>
          <div className='loader-contain' />
        </div>
      </AdminLoader>
    );
  }

  const oldHaveASubscription = (level: number, method: string) => {
    return [1, 4, 5, 6, 7, 8].includes(level) || 'admin' === method;
  };

  const haveASubscription = (level: number, final_date: number) => {
    return level !== 0 && level !== 10 && final_date > today;
  };

  const haveRecurrentSuscription = (level: number) => {
    return [1, 4, 7].includes(level);
  };

  const generateButtons = (): JSX.Element[] => {
    const fontStyles: CSSProperties = {
      fontWeight: 'bold',
      color: '#6717cd',
      fontSize: '22px',
    };

    if (
      haveRecurrentSuscription(user.level) &&
      !(
        [1, 4, 7].includes(user.level) &&
        user.final_date < today - 10 * 24 * 60 * 60
      )
    ) {
      const fontStyles2: CSSProperties = {
        ...fontStyles,
        textAlign: 'center',
        paddingInline: '25px',
      };
      return [
        <p style={fontStyles2}>Usuario de pago recurrente.</p>,
        <p style={fontStyles2}>
          No sé le puede agregar / remover dias ni eliminar suscripción.
        </p>,
      ];
    }

    const elements: JSX.Element[] = [];

    if (user.level === 10) {
      return [<p style={fontStyles}>Comunicarse con soporte.</p>];
    }

    if ([0, 5, 6, 8].includes(user.level)) {
      elements.push(
        <TransparentButton
          style={{ width: '100%', maxWidth: '350px' }}
          onClick={() => {
            setShowAddDays(true);
          }}
        >
          Editar días de suscripción
        </TransparentButton>,
      );
    }

    console.log({ final_date: new Date(user.final_date * 1000) });

    console.log({ user });

    if (
      !haveASubscription(user.level, user.final_date) ||
      ([1, 4, 7].includes(user.level) &&
        user.final_date < today - 10 * 24 * 60 * 60)
    ) {
      elements.push(
        <TransparentButton
          style={{ width: '100%', maxWidth: '350px' }}
          onClick={() => {
            setShowAddSubscriptionPlan(true);
          }}
        >
          Activar plan de suscripción
        </TransparentButton>,
      );
    } else {
      elements.push(
        <TransparentButton
          style={{ width: '100%', maxWidth: '350px' }}
          onClick={() => {
            setShowRemoveSuscription(true);
          }}
        >
          Eliminar suscripción
        </TransparentButton>,
      );
    }

    return elements;
  };

  const getMembershipTextByLevel = (level: number) => {
    let text = '';
    if (level === 1 || level === 6) {
      text = 'Mensual';
    } else if (level === 7 || level === 8) {
      text = 'Cuatrimestral';
    } else if (level === 4 || level === 5) {
      text = 'Anual';
    }

    if (text.length !== 0) {
      return text;
    }

    return `Caso especial, nivel ${level} `;
  };

  const convertToFormalDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthsOfYear = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return `${day} de ${monthsOfYear[month]} de ${year} `;
  };

  const getSubscriptionJSXElementByUserValues = (): JSX.Element[] => {
    if (!haveASubscription(user.level, user.final_date)) {
      return [];
    }

    const arrayOfInfoElements = [
      <Info>
        Final de suscripción:
        <Label>{convertToFormalDate(user.final_date)}</Label>
      </Info>,
    ];

    if (user.start_date !== 0) {
      arrayOfInfoElements.unshift(
        <Info>
          Inicio de suscripción:
          <Label>{convertToFormalDate(user.start_date)}</Label>
        </Info>,
      );
    }

    return arrayOfInfoElements;
  };

  const getSubscriptionText = (
    userLevel: number,
    finalDate: number,
    userRole: 'user' | 'admin' | 'superAdmin',
    method: string,
  ): string => {
    const today = new Date().getTime() / 1000;
    const tolerance = 10 * 24 * 60 * 60;

    if (userLevel === 5 && finalDate > today) {
      return 'Anual';
    } else if (userLevel === 6 && finalDate > today) {
      return 'Mensual';
    } else if (userLevel === 8 && finalDate > today) {
      return 'Cuatrimestral';
    }

    if (userLevel === 1 && finalDate > today) {
      return 'Mensual';
    } else if (
      userLevel === 1 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return 'Mensual, reintentando pago';
    }

    if (userLevel === 4 && finalDate > today) {
      return 'Anual';
    } else if (
      userLevel === 1 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return 'Anual, reintentando pago';
    }

    if (userLevel === 7 && finalDate > today) {
      return 'Cuatrimestral';
    } else if (
      userLevel === 7 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return 'Cuatrimestral, reintentando pago';
    }

    console.log({ final_date: new Date(finalDate * 1000), level: userLevel });

    if (userLevel === 0 && finalDate > today) {
      return `Sin suscripción, con acceso hasta ${`${new Date(finalDate * 1000).toJSON().slice(0, 10)}`} `;
    }

    return `Sin suscripción`;
  };

  return (
    <Modal show={isVisible} onHide={() => setIsVisible(false)} size='lg'>
      <UserContain>
        <TitleContain>
          <FirstBox>
            <Title>Usuario Activo</Title>
          </FirstBox>
          <CloseIcon onClick={() => setIsVisible(false)} />
        </TitleContain>
        <>
          <ProfileContain>
            <img
              src={user.photo ? user.photo : '/images/admin/ProfileIcon.png'}
            />
          </ProfileContain>
          <UserInfo>
            <Info>
              Usuario
              <Label>{user.name}</Label>
            </Info>
            <Info>
              Puntos
              <Label>{user.score}</Label>
            </Info>
            <Info>
              Correo electrónico
              <Label style={{ overflowWrap: 'break-word' }}>{user.email}</Label>
            </Info>
            <Info>
              Teléfono
              <Label>{user.phone_number ? user.phone_number : 'N/A'}</Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>{formatDate(user.created_at)}</Label>
            </Info>
            <Info>
              Suscripción Actual
              <Label>
                {getSubscriptionText(
                  user.level,
                  user.final_date,
                  'user',
                  user.method,
                )}
              </Label>
            </Info>
            {
              ((user.admin_update_id !== null || user.admin_update_id !== undefined) &&
                (user.method === 'admin')) &&
              <Info>
                Admin responsable
                <Label>
                  {updateAdminName}
                </Label>
              </Info>
            }
            {getSubscriptionJSXElementByUserValues()}
            {haveASubscription(user.level, user.final_date) && (
              <img src={GonvarImg} className='img-gonvar' />
            )}
          </UserInfo>
          {/* Para agrupar los botones */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              paddingTop: '20px',
            }}
          >
            {((canEdit && userLevel === 'admin') ||
              userLevel === 'superAdmin') &&
              generateButtons()}
          </div>
        </>
        <Modal1
          show={show}
          setShow={setShow}
          user={user}
          courses={courses}
          handleCourse={handleCourse}
          openUserCardData={openUserCardData}
        />
        <ModalAddDays
          show={showAddDays}
          setShow={setShowAddDays}
          user={user}
          adminUserId={adminUserId}
        />
        <ModalAddSubscriptionPlan
          show={showAddSubscriptionPlan}
          setShow={setShowAddSubscriptionPlan}
          user={user}
          adminUserId={adminUserId}
        />
        <ModalRemoveSubscription
          show={showRemoveSuscription}
          setShow={setShowRemoveSuscription}
          user={user}
        />
        <ErrorModal
          show={error}
          setShow={setError}
          error={
            'Lo sentimos, esta acción solo se puede realizar manualmente desde Firebase, gracias!'
          }
        ></ErrorModal>
      </UserContain>
    </Modal>
  );
};
export default UserCardData;
