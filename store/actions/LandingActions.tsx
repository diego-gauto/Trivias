import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { HeroData } from "../../components/admin/Landing/HeroSection/IHeroSection";
import { Product } from "../../components/admin/Landing/ProductsSection/IProductsSection";
import { db } from "../../firebase/firebaseConfig";

export const getLandingData = async () => {
  const heroSectionRef = doc(db, "landingPage", "heroSection")
  const featureShowcaseSectionRef = doc(db, "landingPage", "featureShowcaseSection")
  const reseniasCollectionRef = collection(db, "landingPage", "reseniasSection", "resenias")
  const productosCollectionRef = collection(db, "landingPage", "productosDestacadosSection", "productos")
  const [
    heroSectionDoc,
    featureShowcaseSectionDoc,
    reseniasDocs,
    productosDestacadosDocs,
  ] = await Promise.all([
    getDoc(heroSectionRef),
    getDoc(featureShowcaseSectionRef),
    getDocs(reseniasCollectionRef),
    getDocs(productosCollectionRef)
  ])
  const parsedReseniasData = reseniasDocs.docs.map((d) => {
    const { nombre, imgURL } = d.data()
    return { title: nombre, imgURL }
  })
  const parsedProductosDestacadosData = productosDestacadosDocs.docs.map((d) => {
    const { nombre, precio, imgURL, clickURL } = d.data()
    return { title: nombre, subtitle: precio, isNew: false, imgURL, clickURL, id: d.id }
  })
  return {
    heroSectionData: heroSectionDoc.data() || {},
    featureShowcaseSectionData: featureShowcaseSectionDoc.data() || {},
    reseniasSectionData: parsedReseniasData || [],
    productosDestacadosData: parsedProductosDestacadosData || []
  }
}

export const saveProductsData = async (products: Product[]) => {
  const productsCollection = db.collection("landingPage").doc("productosDestacadosSection").collection("productos")
  const promises = products.map((p) => {
    const { title, subtitle, imgURL, clickURL, id } = p
    return productsCollection.doc(id).update({
      nombre: title,
      precio: subtitle,
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
  const heroSectionRef = doc(db, "landingPage", "heroSection")
  try {
    await uploadFile(heroData.heroImage, "landing/HeroImage")
    const { heroImage, ...dataToUpdate } = heroData
    // @ts-expect-error
    await updateDoc(heroSectionRef, dataToUpdate)
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
  const storage = getStorage()
  return await getDownloadURL(ref(storage, path))
}
