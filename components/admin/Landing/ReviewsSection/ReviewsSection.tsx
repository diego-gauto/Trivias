import React, { useEffect, useState } from 'react'
import { downloadFileWithStoragePath, saveReviewsData } from '../../../../store/actions/LandingActions';
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
} from "../Landing.styled";
import { IReviewsSectionProps } from './IReviewsSection';
import { LoaderContain } from "../../../../screens/Login.styled";
import { updateLandingImage, updateLandingUserImage } from '../../../../store/actions/AdminActions';
import { updateLandingReviewApi } from '../../../api/admin';

const ReviewsSection = (props: IReviewsSectionProps) => {
  const { reviewsSectionData } = props;
  const [reviewsData, setReviewsData] = useState(reviewsSectionData);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    reviewsData.forEach((element) => {
      downloadFileWithStoragePath(element.user_image).then((res: any) => {
        element.tempUserImg = res;
      })
      downloadFileWithStoragePath(element.image).then((res: any) => {
        element.tempImg = res;
      })
    })
    setReviewsData(reviewsData);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [])

  const updateState = (e: any, key: string, i: number) => {
    const newState = [...reviewsData];
    // @ts-expect-error
    newState[i][key] = (key === "userfile" || key === "file") ? e.target.files[0] : e.target.value;
    setReviewsData(newState);
  }

  const onSave = async () => {
    reviewsData.map(async (reviewData) => {
      if (reviewData.image_new) {
        await updateLandingImage(reviewData.tempImg, reviewData.id).then((url) => {
          reviewData.image = url;
        })
      }
      if (reviewData.user_image_new) {
        await updateLandingUserImage(reviewData.tempUserImg, reviewData.id).then((url) => {
          reviewData.user_image = url;
        })
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
      }
      await updateLandingReviewApi(review).then((res) => {
        console.log(res);
      })
    })
  }
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
  }

  const getImageBg = (file: any, i: number) => {
    let tempReview: any = reviewsData;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      tempReview[i].tempImg = reader.result;
      tempReview[i].image_new = reader.result;
      setReviewsData(tempReview);
    };
  }
  const getReviewElement = (review: any, num: number) => {
    return (
      <div className='content' key={"Review_Data_" + num}>
        {!loader ? <img style={{ width: "100px", marginInline: "auto" }} src={review.tempUserImg} alt="" /> :
          <LoaderContain style={{ position: "relative", width: "60px", height: "60px", alignSelf: "center" }} />}
        <Inputs>
          <EditText>
            Imagen de usuario
          </EditText>
          <FolderInput
            onChange={(e) => { updateState(e, "userfile", num); getImage(e.target.files, num) }}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Reseñador {num + 1}
          </EditText>
          <EditInput
            onChange={(e) => updateState(e, "user_name", num)}
            value={review.user_name}
            placeholder="Luke Skywalker"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Facebook link:
          </EditText>
          <EditInput
            onChange={(e) => updateState(e, "facebook_url", num)}
            value={review.facebook_url}
            placeholder="facebook.com/gonvar"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Reseña:
          </EditText>
          <textarea onChange={(e) => updateState(e, "about", num)}
            defaultValue={review.about}
            placeholder="Reseña"></textarea>
        </Inputs>
        {!loader ? <img style={{ width: "100px", marginInline: "auto" }} src={review.tempImg} alt="" /> :
          <LoaderContain style={{ position: "relative", width: "60px", height: "60px", alignSelf: "center" }} />}
        <Inputs>
          <EditText>
            Imagen fondo
          </EditText>
          <FolderInput
            onChange={(e) => { updateState(e, "file", num); getImageBg(e.target.files, num) }}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
      </div>
    )
  }
  const col1 = chunk1.map((review: any, i: number) => {
    return (getReviewElement(review, i))
  });
  const col2 = chunk2.map((review: any, i: number) => {
    return getReviewElement(review, i + 3)
  });
  const col3 = chunk3.map((review: any, i: number) => {
    return getReviewElement(review, i + 7)
  });

  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <ColumnsContainer>
        <ColumnsContainer2>
          {col1}
        </ColumnsContainer2>
        <ColumnsContainer2>
          {col2}
        </ColumnsContainer2>
        <ColumnsContainer2>
          {col3}
        </ColumnsContainer2>
      </ColumnsContainer>
      <EditButtons>
        <SaveButton onClick={onSave}>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default ReviewsSection