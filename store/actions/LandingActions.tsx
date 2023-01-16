import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { HeroData } from "../../components/admin/Landing/HeroSection/IHeroSection";
import { Product } from "../../components/admin/Landing/ProductsSection/IProductsSection";
import { Review } from "../../components/admin/Landing/ReviewsSection/IReviewsSection";
import { db } from "../../firebase/firebaseConfig";

export const getLandingData = async () => {
  const heroSectionRef = doc(db, "landingPage", "heroSection")
  const featureShowcaseSectionRef = doc(db, "landingPage", "featureShowcaseSection")
  const reseniasCollectionRef = collection(db, "landingPage", "reseniasSection", "resenias")
  const experienciasCollectionRef = collection(db, "landingPage", "experienciasUsuario", "resenias")
  const productosCollectionRef = collection(db, "landingPage", "productosDestacadosSection", "productos")
  const [
    heroSectionDoc,
    featureShowcaseSectionDoc,
    reseniasDocs,
    experienciasDocs,
    productosDestacadosDocs,
  ] = await Promise.all([
    getDoc(heroSectionRef),
    getDoc(featureShowcaseSectionRef),
    getDocs(reseniasCollectionRef),

    getDocs(experienciasCollectionRef),
    getDocs(productosCollectionRef),
  ])
  const parsedReseniasData = reseniasDocs.docs.map((d) => {
    const { nombre, imgURL } = d.data()
    return { title: nombre, imgURL: downloadFileWithStoragePath(imgURL), id: d.id }
  })
  const parsedExperienciasData = experienciasDocs.docs.map((d) => {
    const { descripcion, username, imgURL, isNew, date, usrImgURL, usrFacebookURL } = d.data()
    var convertedDate = new Date(date.toDate())
    return { descripcion, username, imgURL, isNew, convertedDate, usrImgURL, usrFacebookURL }
  })
  const parsedProductosDestacadosData = productosDestacadosDocs.docs.map((d) => {
    const { nombre, precio, compraRapida, imgURL, isNew, clickURL, currency,
      disponible } = d.data()
    return { title: nombre, precio, compraRapida, currency, disponible, isNew, imgURL, clickURL, id: d.id }
  })
  return {
    heroSectionData: heroSectionDoc.data() || {},
    featureShowcaseSectionData: featureShowcaseSectionDoc.data() || {},
    reseniasSectionData: parsedReseniasData || [],
    experienciasSectionData: parsedExperienciasData || [],
    productosDestacadosData: parsedProductosDestacadosData || []
  }
}

export const saveProductsData = async (products: Product[]) => {
  const productsCollection = db.collection("landingPage").doc("productosDestacadosSection").collection("productos")
  const promises = products.map((p) => {
    const { title, subtitle, imgURL, clickURL, id, precio } = p
    return productsCollection.doc(id).update({
      nombre: title,
      precio: precio,
      isNew: false,
      imgURL,
      clickURL
    })
  })
  const updatedFiles = products.filter((p) => !!p.file)
  const filePromises = updatedFiles.map(async ({ file, id }) => {
    const result = await uploadFile(file!, `landing/productos/${id}`)
    return productsCollection.doc(id).update({
      imgURL: result.metadata.fullPath
    })
  })
  try {
    await Promise.all([...promises, ...filePromises])
  } catch {
    return false
  }
  return true
}

export const saveHeroData = async (heroData: HeroData) => {
  const heroSectionRef = doc(db, "landingPage", "heroSection");
  console.log(heroData);
  try {
    const image = await uploadFile(heroData.heroImage, "landing/HeroImage")
    heroData.heroImage = image.metadata.fullPath
    const { heroImage, ...dataToUpdate } = heroData
    // @ts -expect-error
    await updateDoc(heroSectionRef, dataToUpdate)
  } catch {
    return false
  }
  return true
}

export const saveReviewsData = async (reviewsData: Review[]) => {
  const reviewsCollection = db.collection("landingPage").doc("reseniasSection").collection("resenias")
  const promises = reviewsData.map((r: any) => {
    const { username, usrFacebookURL, descripcion, id } = r
    return reviewsCollection.doc(id).update({
      username: username,
      usrFacebookURL: usrFacebookURL,
      descripcion: descripcion
    })
  })
  const updatedFiles = reviewsData.filter((p) => !!p.file)
  const filePromises = updatedFiles.map(async ({ file, id }) => {
    // const result = await uploadFile(file!, `landing/reseñas/${id}`)
    // return reviewsCollection.doc(id).update({
    //   imgURL: result.metadata.fullPath
    // })
  })
  try {
    await Promise.all([...promises, ...filePromises])
  } catch {
    return false
  }
  return true
}

export const uploadFile = async (file: File, uploadPath: string) => {
  const storage = getStorage()
  const storageRef = ref(storage, uploadPath)
  return await uploadBytes(storageRef, file)
}

export const downloadFileWithStoragePath = async (path: string) => {
  try {

    const storage = getStorage()
    return await getDownloadURL(ref(storage, path))
  } catch (error) {

  }
  return ""
}
