import styled from "styled-components";

export const BlogContainer = styled.div`
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  gap: 30px;
  .title-contain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .title {
      font-size: 36px;
      font-weight: 500;
    }
    .add-course {
      border: 1px solid #6717cd;
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      background-color: transparent;
      .add-text {
        color: #6717cd;
      }
      &:hover {
        background-color: #ede6f5;
        transition: 0.2s ease all;
      }
    }
  }
  .blogs {
    display: grid;
    justify-content: center;
    gap: 40px;
    margin-bottom: 50px;
    grid-template-columns: repeat(2, 300px);
  }
`;
export const BlogCard = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 300px;
  border: 1px solid black;
  .img-contain {
    position: relative;
    cursor: pointer;
    .blog-image {
      width: 298px;
      height: 200px;
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
      font-weight: 500;
      line-height: 30px;
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
