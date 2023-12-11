import React, { useEffect, useState } from 'react'
import { updateLandingProductImage } from '../../../../store/actions/AdminActions';
import { downloadFileWithStoragePath, saveProductsData } from '../../../../store/actions/LandingActions';
import { updateLandingProductApi } from '../../../api/admin';
import { divideArrayInChunks } from '../../../Home/Module5/helpers';
import {
  ColumnsContainer,
  ColumnsContainer2,
  EditButtons,
  EditInput,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
  GridContainer,
  GridItem,
  EditInputResponsive,
  InputsResponsive,
  ImageInGrid,
  FolderInputResponsive,
} from "../Landing.styled";
import { IProductsSectionProps, Product } from './IProductsSection';
import { title } from 'process';
import { LoaderContain } from '../../../Loader.styled';

const ProductsSection = (props: IProductsSectionProps) => {
  const { productsSectionData } = props;
  const [productsData, setProductsData] = useState(productsSectionData)
  const [isLoading, setLoader] = useState(true);

  const chunk1 = productsData.slice(0, 3)
  const chunk2 = productsData.slice(3, 6)
  const updateProductState = (e: any, key: string, i: number) => {
    const newState: any = [...productsData]
    if (key === "available") {
      newState[i][key] = e.target.value === "disponible" ? 1 : 0
    }
    else {
      newState[i][key] = key === "file" ? e.target.files[0] : e.target.value
    }
    setProductsData(newState)
  }

  useEffect(() => {
    productsData.forEach((element) => {
      downloadFileWithStoragePath(element.image).then((res: any) => {
        element.img_display = res
      })
    })
    setProductsData(productsData);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [])

  const getImage = (file: any, i: number) => {
    let tempProduct: any = productsData;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      tempProduct[i].img_display = reader.result;
      tempProduct[i].new_image = reader.result;
      setProductsData(tempProduct)
    };
  }
  const gerProductElement = ({ clickURL, imgURL, title, subtitle, price, url, image, img_display, available }: Product, i: number) => {
    return (
      <GridItem key={"product_landing_" + i}>
        <InputsResponsive>
          <EditText>
            Producto {i + 1}
          </EditText>
          <EditInputResponsive
            onChange={(e) => updateProductState(e, "title", i)}
            value={title}
            placeholder="Gonvar Nails Leonardo Da Vinci"
          />
        </InputsResponsive>
        <InputsResponsive>
          <EditText>
            Precio
          </EditText>
          <EditInputResponsive
            onChange={(e) => updateProductState(e, "price", i)}
            value={price}
            placeholder="Desde $ 12.00"
          />
        </InputsResponsive>
        <InputsResponsive>
          <EditText>
            Producto Disponible
          </EditText>
          <select onChange={(e) => { updateProductState(e, "available", i) }} defaultValue={available === 1 ? "disponible" : "agotado"}>
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
          </select>
        </InputsResponsive>
        <InputsResponsive>
          <EditText>
            Página del Producto
          </EditText>
          <EditInputResponsive
            onChange={(e) => updateProductState(e, "url", i)}
            value={url}
            placeholder="https://google.com"
          />
        </InputsResponsive>
        <InputsResponsive>
          <EditText>
            Imagen del Producto
          </EditText>
          <FolderInputResponsive
            onChange={(e) => { updateProductState(e, "file", i); getImage(e.target.files, i) }}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </InputsResponsive>
        {
          getImageJSXElement(isLoading, img_display, title)
        }
      </GridItem>
    )
  }

  const getImageJSXElement = (isLoading: boolean, img_display: any, title: any) => {
    if (!isLoading) {
      return (<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '250px', padding: '20px' }} src={img_display} alt={title} />
      </div>);
    }
    return (<LoaderContain style={{ position: "relative", width: "60px", height: "60px", alignSelf: "center" }} />);
  }

  const elementsToShow = [...chunk1, ...chunk2].map((product: Product, i: number) => {
    return (
      gerProductElement(product, i)
    )
  })
  const onSave = async () => {
    productsData.map(async (product, index) => {
      if (product.new_image) {
        await updateLandingProductImage(product.new_image, product.id).then((url) => {
          product.image = url;
        })
      }
      let prodUpdate = {
        id: product.id,
        price: product.price,
        url: product.url,
        title: product.title,
        currency: product.currency,
        available: product.available,
        purchase: product.purchase,
        is_new: product.is_new,
        image: product.image,
      }
      await updateLandingProductApi(prodUpdate).then((res) => {
        console.log(res);
      })
      if (productsData.length === index + 1) {
        alert("Productos Guardadas con exito!")
      }
    })
  }
  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <GridContainer>
        {elementsToShow}
      </GridContainer>
      <EditButtons>
        <SaveButton onClick={onSave}>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default ProductsSection