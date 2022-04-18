import { CSSProperties, useEffect, useState } from "react";

// ############################ PARSE CSS ################################
/**
 * Parses a regular `CSSProperties object` to a CSS syntax string, which can be directly
 * inserted inside `styled-components`' `css` function
 * @param JS `CSSProperties object` to parse into `string`
 * @returns the parsed `string` from the `JS` parameter
 */
export const parseCSS = (JS: any) => {
  var cssString = "";

  for (var objectKey in JS) {
    cssString +=
      objectKey.replace(/([A-Z])/g, (g) => `-${g[0]?.toLowerCase()}`) +
      ": " +
      JS[objectKey] +
      ";\n";
  }

  return cssString;
};

// ############################ FORMAT TEXT ################################

export interface formatTextProps {
  _text?: string;
  _newLine?: string;
  _translate?: boolean;
}

/**
 * Formats a text correctly in the sense of spacing and line-breaking.
 *
 * It also replaces any given text string with a line-break of better manipulation.
 * (By line-break we refer to the `\n` character with the 'ENTER' key)
 *
 * @param props Object containing the following parameters:
 * @param props._text `string` of any type without a correct format (e.g. many spaces or line-breaks).
 * @param props._newLine `string` value to search for and replace with a line-break, functioning like a manual line-break.
 * If an empty string is given `""` it won't add any line-break at all. Default: `;;`
 * @param props._attemptTranslation `boolean` Default: `true`. Whether or not interpretate the given string as a `i18next` key for translation
 * @returns A `string` limited with one space between each word, with all line-breaks removed and new ones added.
 */
export function formatText(props: formatTextProps) {
  if (props._text === undefined) return "";

  var replaceAllAllowed = true;

  try {
    "string".replaceAll("s", "t");
  } catch (error) {
    replaceAllAllowed = false;
  }

  props._newLine = props._newLine ? props._newLine : ";;";
  props._translate = props._translate ? props._translate : false;

  // if (props._translate) props._text = t(props._text); // TRANSLATION DEACTIVATED

  // Remove white spaces
  props._text = props._text!.trim();

  // Replace break-lines
  if (replaceAllAllowed) props._text = props._text.replaceAll("\n", " ");
  else props._text = props._text.replace(/\n+/gm, " ");

  // Separate valid text strings
  const textArray = props._text.split(" ").filter((t) => t !== "");

  var newString = "";

  for (let i = 0; i < textArray.length; i++) {
    newString += textArray[i];

    if (
      i !== textArray.length - 1 &&
      textArray[i + 1] !== props._newLine &&
      textArray[i] !== props._newLine
    ) {
      newString += " ";
    }
  }

  // Replace break-lines
  if (replaceAllAllowed) return newString.replaceAll(props._newLine, "\n");
  else return newString.replace(new RegExp(`${props._newLine}`, "gm"), "\n");
}

// ############################ STYLE TEXT ################################

export interface styleTextOptions {
  _text?: string;
  _boldWrap?: string;
  _italicsWrap?: string;
  _crossWrap?: string;
  _muteWrap?: string;
  _underlineWrap?: string;
  _emphasisWrap?: string;
  _emphasisColor?: string;
  _linkWrap?: string;
  _linkList?: Array<string>;
  _linkStyles?: Array<string>;
  _fontSizeWrap?: string;
  _fontSizeList?: Array<string>;
  _fontSizeStyles?: Array<CSSProperties>;

  _format?: boolean;
  _formatNewLine?: string;
  _formatTranslate?: boolean;
}

export function styleText(props: styleTextOptions) {
  if (props._text === undefined) return <></>;

  props._format = props._format ? props._format : true;

  if (props._format) {
    props._text = formatText({
      _text: props._text,
      _translate: props._formatTranslate,
      _newLine: props._formatNewLine,
    });
  }

  const options: {
    [key: string]: string | string[] | CSSProperties[];
  } = {
    boldWrap: props._boldWrap ? props._boldWrap : "*",
    italicsWrap: props._italicsWrap ? props._italicsWrap : "_",
    crossWrap: props._crossWrap ? props._crossWrap : "~",
    muteWrap: props._muteWrap ? props._muteWrap : "#",
    underlineWrap: props._underlineWrap ? props._underlineWrap : "&",
    emphasisWrap: props._emphasisWrap ? props._emphasisWrap : "$",
    emphasisColor: props._emphasisColor ? props._emphasisColor : "#6717CD",
    linkWrap: props._linkWrap ? props._linkWrap : "=",
    linkList: props._linkList ? props._linkList : ["/"],
    linkStyles: props._linkStyles
      ? props._linkStyles
      : ["custom-link pp grow both"],
    fontSizeWrap: props._fontSizeWrap ? props._fontSizeWrap : "^",
    fontSizeList: props._fontSizeList ? props._fontSizeList : [""],
    fontSizeStyles: props._fontSizeStyles ? props._fontSizeStyles : [{}],
  };

  const fields = [
    "bold",
    "italics",
    "cross",
    "mute",
    "underline",
    "emphasis",
    "link",
    "fontSize",
  ];

  const refill: {
    [key: string | number]: string[];
  } = {
    bold: ["<span style='font-weight: 800;'>", "</span>"],
    italics: ["<span style='font-style: italic;'>", "</span>"],
    cross: ["<span style='text-decoration: line-through;'>", "</span>"],
    mute: ["<span style='opacity: 40%;'>", "</span>"],
    underline: ["<span style='text-decoration: underline'>", "</span>"],
    emphasis: [`<span style='color: ${options.emphasisColor}'>`, "</span>"],
    link: [
      `<a class=${options.linkStyles![0]} href=${options.linkList![0]}> `,
      "</a>",
    ],
    fontSize: [
      `<span style='font-size: ${options.fontSizeList![0]}'>`,
      "</span>",
    ],
  };

  const regEx: {
    [key: string]: RegExp;
  } = {};

  for (let i = 0; i < fields.length; i++) {
    var temp = options[`${fields[i]}Wrap`]!;
    if (typeof temp !== "string") temp = "";
    temp = temp.replace(/./gim, "$&");

    try {
      regEx[fields[i]!] = new RegExp("(?<!\\\\)\\" + temp, "gim");
    } catch (e) {
      regEx[fields[i]!] = new RegExp("\\" + temp, "gim");
    }
  }

  const sections: {
    [key: string]: any;
  } = {};

  for (let i = 0; i < fields.length; i++) {
    sections[fields[i]!] = new Array<number>();
  }

  for (let i = 0; i < fields.length; i++) {
    while (true) {
      var match = regEx[fields[i]!]!.exec(props._text);
      if (match === null) break;

      sections[fields[i]!].push(match.index);
    }
  }

  const process = new Array<Array<string | number>>();

  for (let i = 0; i < fields.length; i++) {
    for (let j = 0; j < sections[fields[i]!].length; j += 2) {
      const pos1 = sections[fields[i]!][j];
      const pos2 = sections[fields[i]!][j + 1];

      if (pos2 !== undefined) {
        process[pos1] = [`${fields[i]}`, 0];
        process[pos2] = [`${fields[i]}`, 1];
      }
    }
  }

  var newText = "";
  var prevCut = 0;
  var lastLink = 0;
  var lastStyle = 0;

  var lastfontSize = 0;

  for (let i = 0; i < process.length; i++) {
    if (process[i] !== undefined) {
      // Si se va a insertar un link, incrustar la url correspondiente
      if (process[i]![0] === "link" && process[i]![1] === 0) {
        newText +=
          props._text.slice(prevCut, i) +
          `<a class='${options.linkStyles![lastStyle]}' href=${
            options.linkList![lastLink]
          }>`;

        if (options.linkList![lastLink + 1] !== undefined) lastLink++;
        if (options.linkStyles![lastStyle + 1] !== undefined) lastStyle++;
      } else if (process[i]![0] === "fontSize" && process[i]![1] === 0) {
        newText +=
          props._text.slice(prevCut, i) +
          `<span style='font-size: ${options.fontSizeList![lastfontSize]}'>`;

        if (options.fontSizeList![lastfontSize + 1] !== undefined)
          lastfontSize++;
      } else {
        var temp2 = process[i]![1]!;
        if (typeof temp2 !== "number") temp2 = 0;

        newText +=
          props._text.slice(prevCut, i) +
          refill[process[i]![0]!.toString()]![temp2];
      }
      prevCut = i + 1;
    }
  }
  newText += props._text.slice(prevCut);

  return <span dangerouslySetInnerHTML={{ __html: newText }} />;
}

// ################################ HOOKS ################################

// ############################ WINDOW SCROLL ################################
/**
 * Hook that reacts to the very top scroll of the screen like the `Header` component does.
 * @param threshold Sets the threshold for the vertical scrolling, defaults to `100`
 * @returns `true` when the screen is scrolled enough, `false` when not
 */
export const useWindowScroll = (threshold: number = 100) => {
  const [scrolled, setScrolled] = useState(false);

  const changeScroll = () => {
    if (window.scrollY > threshold) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
  }, []);

  return scrolled;
};
