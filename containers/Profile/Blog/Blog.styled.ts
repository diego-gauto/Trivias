import styled from 'styled-components';

export const BlogContainer = styled.div`
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 100px;
  background-color: #ede7f2;
  .title-contain {
    display: flex;
    width: 100%;
    justify-content: center;
    .title {
      font-size: 30px;
      font-weight: 500 !important;
      margin-top: 90px;
    }
  }
  .blogs {
    display: grid;
    justify-content: center;
    column-gap: 5%;
    row-gap: 50px;
    margin-bottom: 50px;
    grid-template-columns: repeat(3, 300px);
    justify-items: center;

    @media (max-width: 1023px) {
      row-gap: 30px;
      grid-template-columns: repeat(2, 300px);
    }
    @media (max-width: 650px) {
      grid-template-columns: repeat(1, 300px);
    }
  }
`;
export const BlogItems = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
  height: fit-content;
  max-width: 400px;
  border: 1px solid #c6c6c6;
  .img-contain {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    .blog-image {
      width: 300px;
      height: auto;
      margin: auto;
      @media (max-width: 650px) {
        width: 80vw;
        max-width: 400px;
      }
    }
    .edit-icon {
      font-size: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      opacity: 0;
    }
    &:hover {
      .blog-image {
        opacity: 0.2;
        transition: 0.2s ease all;
      }
      .edit-icon {
        opacity: 1;
        transition: 0.2s ease all;
      }
    }
  }
  .text-contain {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    .blog-title {
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
      overflow: hidden;
    }
    .create-date-contain {
      display: flex;
      gap: 5px;
      p {
        font-size: 14px;
      }
    }
    .last-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .blog-about {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin: 0;
        overflow: hidden;
      }
      .read-more {
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        width: fit-content;
        &:hover {
          color: #6717cd;
        }
      }
    }
  }
`;
