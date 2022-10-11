import { useEffect, useState } from "react";
import { FirstSection } from "../../../components/Home/FirstSection/FirstSection";
import { downloadFileWithStoragePath, getLandingData } from "../../../store/actions/LandingActions";

export const FirstSectionContainer = ({ loading }: any) => {
  const [sectionData, setSectionData] = useState<any>();
  const [landingImg, setLandingImg] = useState("")

  useEffect(() => {
    const fetchLandingData = async () => {
      const landingData = await getLandingData();
      setSectionData(landingData.heroSectionData);
    }
    fetchLandingData();
  }, []);

  const awaitImg = async () => {
    const resolvedImg = await downloadFileWithStoragePath(sectionData.heroImage)
    setLandingImg(resolvedImg)
  }

  useEffect(() => {
    sectionData && awaitImg()
  }, [sectionData])

  return (
    <FirstSection data={sectionData} img={landingImg} loading={loading} />
  )
}
