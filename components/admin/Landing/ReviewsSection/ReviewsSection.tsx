import React, { useState } from 'react'
import { saveReviewsData } from '../../../../store/actions/LandingActions';
import { divideArrayInChunks } from '../../../Home/Module5/helpers';
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
import { IReviewsSectionProps, Review } from './IReviewsSection';

const ReviewsSection = (props: IReviewsSectionProps) => {
  const { reviewsSectionData } = props;
  const [reviewsData, setReviewsData] = useState(reviewsSectionData)

  const updateState = (e: any, changedItemId: string, key: string) => {
    const newState = [...reviewsData]
    const changedItem: Review = newState.find(({ id }) => id === changedItemId)!
    // @ts-expect-error
    changedItem[key] = key === "file" ? e.target.files[0] : e.target.value
    setReviewsData(newState)
  }

  const onSave = async () => {
    console.log(reviewsData);

    const success = saveReviewsData(reviewsData)
    let alertText = "Cambios realizados correctamente"
    if (!success) {
      alertText = "Hubo un error"
    }
    alert(alertText)
  }
  const chunk1 = reviewsData.slice(0, 3);
  const chunk2 = reviewsData.slice(3, 6)
  const chunk3 = reviewsData.slice(6, 9)

  const getReviewElement = (review: any, num: number) => {
    return (
      <>
        <Inputs>
          <EditText>
            Reseñador {num + 1}
          </EditText>
          <EditInput
            onChange={(e) => updateState(e, review.id, "title")}
            value={review.username}
            placeholder="Luke Skywalker"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Facebook link:
          </EditText>
          <EditInput
            onChange={(e) => updateState(e, review.id, "facebook")}
            value={review.usrFacebookURL}
            placeholder="facebook.com/gonvar"
          />
        </Inputs>
        {/* <img src="" alt="" /> */}
        <Inputs>
          <EditText>
            Imagen de usuario
          </EditText>
          <FolderInput
            onChange={(e) => updateState(e, review.id, "file")}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Reseña:
          </EditText>
          <textarea contentEditable onChange={(e) => updateState(e, review.id, "reseña")}
            value={review.descripcion}
            placeholder="Reseña"></textarea>
        </Inputs>
        {/* <Inputs>
          <EditText>
            Evidencia Reseña {num + 1}
          </EditText>
          <FolderInput
            onChange={(e) => updateState(e, review.id, "file")}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs> */}
      </>
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