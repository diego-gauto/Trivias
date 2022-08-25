import { doc, getDoc, collection, getDocs } from "firebase/firestore";
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

export const saveProductsData = (products: Product[]) => {
  const productsCollection = db.collection("landingPage").doc("productosDestacadosSection").collection("productos")
  products.forEach((p) => {
    const { title, subtitle, imgURL, clickURL, id } = p
    productsCollection.doc(id).update({
      nombre: title,
      precio: subtitle,
      isNew: false,
      imgURL,
      clickURL
    })
  })
}
