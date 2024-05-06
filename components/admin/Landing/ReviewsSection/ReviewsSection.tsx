import React, { useEffect, useState } from 'react';
import {
  downloadFileWithStoragePath,
  saveReviewsData,
} from '../../../../store/actions/LandingActions';
import {
  ColumnsContainer,
  ColumnsContainer2,
  EditButtons,
  EditInput,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
  GridContainer,
  GridItem,
  EditInputResponsive,
  FolderInputResponsive,
  InputsResponsive,
  EditInputTextAreaResponsive,
} from '../Landing.styled';
import { IReviewsSectionProps } from './IReviewsSection';
import { LoaderContain } from '../../../../screens/Login.styled';
import {
  updateLandingImage,
  updateLandingUserImage,
} from '../../../../store/actions/AdminActions';
import { updateLandingReviewApi } from '../../../api/admin';

const ReviewsSection = (props: IReviewsSectionProps) => {
  const { reviewsSectionData } = props;
  const [reviewsData, setReviewsData] = useState(reviewsSectionData);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    reviewsData.forEach((element) => {
      downloadFileWithStoragePath(element.user_image).then((res: any) => {
        element.tempUserImg = res;
      });
      downloadFileWithStoragePath(element.image).then((res: any) => {
        element.tempImg = res;
      });
    });
    setReviewsData(reviewsData);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  const updateState = (e: any, key: string, i: number) => {
    const newState = [...reviewsData];
    // @ts-expect-error
    newState[i][key] =
      key === 'userfile' || key === 'file' ? e.target.files[0] : e.target.value;
    setReviewsData(newState);
  };

  const onSave = async () => {
    reviewsData.map(async (reviewData, index) => {
      if (reviewData.image_new) {
        await updateLandingImage(reviewData.tempImg, reviewData.id).then(
          (url) => {
            reviewData.image = url;
          },
        );
      }
      if (reviewData.user_image_new) {
        await updateLandingUserImage(
          reviewData.tempUserImg,
          reviewData.id,
        ).then((url) => {
          reviewData.user_image = url;
        });
      }
      let review = {
        id: reviewData.id,
        about: reviewData.about,
        facebook_url: reviewData.facebook_url,
        user_name: reviewData.user_name,
        image: reviewData.image,
        user_image: reviewData.user_image,
        new: reviewData.new,
        date: reviewData.date,
      };
      await updateLandingReviewApi(review).then((res) => {
        console.log(res);
      });
      if (reviewsData.length === index + 1) {
        alert('Reseñas Guardadas con exito!');
      }
    });
  };
  const chunk1 = reviewsData.slice(0, 3);
  const chunk2 = reviewsData.slice(3, 6);
  const chunk3 = reviewsData.slice(6, 9);

  const getImage = (file: any, i: number) => {
    let tempReview: any = reviewsData;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      tempReview[i].tempUserImg = reader.result;
      tempReview[i].user_image_new = reader.result;
      setReviewsData(tempReview);
    };
  };

  const getImageBg = (file: any, i: number) => {
    let tempReview: any = reviewsData;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      tempReview[i].tempImg = reader.result;
      tempReview[i].image_new = reader.result;
      setReviewsData(tempReview);
    };
  };
  const getReviewElement = (review: any, num: number) => {
    return (
      <GridItem>
        <div className='content' key={'Review_Data_' + num}>
          {!loader ? (
            <img
              style={{ width: '100px', marginInline: 'auto' }}
              src={review.tempUserImg}
              alt=''
            />
          ) : (
            <LoaderContain
              style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                alignSelf: 'center',
              }}
            />
          )}
          <InputsResponsive>
            <EditText>Imagen de usuario</EditText>
            <FolderInputResponsive
              onChange={(e) => {
                updateState(e, 'userfile', num);
                getImage(e.target.files, num);
              }}
              type='file'
              placeholder='Seleccionar archivo'
            />
          </InputsResponsive>
          <InputsResponsive>
            <EditText>Reseñador {num + 1}</EditText>
            <EditInputResponsive
              onChange={(e) => updateState(e, 'user_name', num)}
              value={review.user_name}
              placeholder='Luke Skywalker'
            />
          </InputsResponsive>
          <InputsResponsive>
            <EditText>Facebook link:</EditText>
            <EditInputResponsive
              onChange={(e) => updateState(e, 'facebook_url', num)}
              value={review.facebook_url}
              placeholder='facebook.com/gonvar'
            />
          </InputsResponsive>
          <InputsResponsive>
            <EditText>Fecha: (respetar formato "2021-08-10")</EditText>
            <EditInputResponsive
              onChange={(e) => updateState(e, 'date', num)}
              value={`${review.date}`.slice(0, 10)}
              placeholder='2021-08-10'
            />
          </InputsResponsive>
          <InputsResponsive>
            <EditText>Reseña:</EditText>
            <EditInputTextAreaResponsive
              style={{}}
              onChange={(e) => updateState(e, 'about', num)}
              defaultValue={review.about}
              placeholder='Reseña'
              rows={10}
            />
          </InputsResponsive>
          {!loader ? (
            <img
              style={{ width: '100px', marginInline: 'auto' }}
              src={review.tempImg}
              alt=''
            />
          ) : (
            <LoaderContain
              style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                alignSelf: 'center',
              }}
            />
          )}
          <InputsResponsive>
            <EditText>Imagen fondo</EditText>
            <FolderInputResponsive
              onChange={(e) => {
                updateState(e, 'file', num);
                getImageBg(e.target.files, num);
              }}
              type='file'
              placeholder='Seleccionar archivo'
            />
          </InputsResponsive>
        </div>
      </GridItem>
    );
  };

  const allReviews = [...chunk1, ...chunk2, ...chunk3].map(
    (review: any, i: number) => {
      return getReviewElement(review, i);
    },
  );

  console.log({ array: [...chunk1, ...chunk2, ...chunk3] });

  return (
    <ProfileData style={{ boxShadow: 'none', background: 'none' }}>
      <GridContainer>{allReviews}</GridContainer>
      <EditButtons>
        <SaveButton onClick={onSave}>Guardar</SaveButton>
      </EditButtons>
    </ProfileData>
  );
};

export default ReviewsSection;
