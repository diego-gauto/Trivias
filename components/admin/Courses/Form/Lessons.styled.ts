import styled from "styled-components";

export const LessonContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;
export const LessonTitle = styled.h1`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;

export const SeasonContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
export const NewSeasonContain = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 20px;
  padding-inline: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  &:hover {
    transform: scale(1.01);
    transition: 0.3s ease all;
  }
`;
export const NewSeason = styled.p`
  font-size: 18px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  color: #6717cd;
  cursor: pointer;
  margin: 0;
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 18px;
  font-weight: 500 !important;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const EpisodesNumber = styled.p`
  font-weight: normal;
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;
export const ButtonContain = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Button = styled.button`
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 10px;
  padding-inline: 25px;
  border: 1px solid #6717cd;
  border-radius: 100px;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const Add = styled.i`
  background-image: url(../images/admin/Courses/plus.svg);
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;
export const ChevU = styled.i`
  background-image: url(../images/Video/icons/arrowUp.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const ChevD = styled.i`
  background-image: url(../images/Video/icons/arrowDown.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const EpisodesContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Episode = styled.div`
  display: flex;
  gap: 40px;
`;
export const EpisodeContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const EpisodeTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const EpisodeTime = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  opactiy: 0.8;
  margin: 0;
`;
export const EpisodeInfo = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  text-align: justify;
  margin: 0;
  white-space: nowrap;
  width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const EditEpisode = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #6717cd;
  padding-left: 40px;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const ImageContain = styled.div`
  display: flex;
  width: 240px;
  height: 136px;
  position: relative;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;
