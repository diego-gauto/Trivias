import DOMPurify from 'dompurify';

import {
  SectionA_01Text01,
  SectionA_02Text01,
} from '../components/Home/Module1/Module1.styled';

export const parseText = (text: string = '') => {
  const bold = /\*\*(.*?)\*\*/gm;
  const html = text.replace(bold, '<span>$1</span>');
  return (
    <SectionA_02Text01
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};

export const parseTitle = (text: string = '') => {
  const bold = /\*\*(.*?)\*\*/gm;
  const html = text.replace(bold, '<span>$1</span>');
  return (
    <SectionA_01Text01
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};
