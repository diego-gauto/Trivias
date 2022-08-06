

import Module1 from "./Module1/Module1";
import Module2 from "./Module2/Module2";
import Module3 from "./Module3/Module3";
import Module4 from "./Module4/Module4";
import Module5 from "./Module5/Module5";
import { ModuleContain, PreviewContain } from "./Preview.styled";

const Preview = () => {
  return (
    <PreviewContain>
      <Module1 />
      <ModuleContain>
        <Module2 />
        <Module3 />
        <Module4 />
      </ModuleContain>
      <Module5 />
    </PreviewContain>
  )
}
export default Preview;