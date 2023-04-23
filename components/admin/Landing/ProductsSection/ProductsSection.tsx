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
} from "../Landing.styled";
import { IProductsSectionProps, Product } from './IProductsSection';

const ProductsSection = (props: IProductsSectionProps) => {
  const { productsSectionData } = props;
  const [productsData, setProductsData] = useState(productsSectionData)



  const chunk1 = productsData.slice(0, 3)
  const chunk2 = productsData.slice(3, 6)
  const updateProductState = (e: any, key: string, i: number) => {
    const newState = [...productsData]
    // @ts-expect-error
    newState[i][key] = key === "file" ? e.target.files[0] : e.target.value
    setProductsData(newState)
  }

  useEffect(() => {
    productsData.forEach((element) => {
      downloadFileWithStoragePath(element.image).then((res: any) => {
        element.img_display = res
      })
    })
    setProductsData(productsData);
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

  const gerProductElement = ({ clickURL, imgURL, title, subtitle, price, url, image, img_display }: Product, i: number) => {
    return (
      <ColumnsContainer2 key={"product_landing_" + i}>
        <Inputs>
          <EditText>
            Producto {i + 1}
          </EditText>
          <EditInput
            onChange={(e) => updateProductState(e, "title", i)}
            value={title}
            placeholder="Gonvar Nails Leonardo Da Vinci"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Precio
          </EditText>
          <EditInput
            onChange={(e) => updateProductState(e, "price", i)}
            value={price}
            placeholder="Desde $ 12.00"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Página del Producto
          </EditText>
          <EditInput
            onChange={(e) => updateProductState(e, "url", i)}
            value={url}
            placeholder="https://google.com"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Imagen del Producto
          </EditText>
          <FolderInput
            onChange={(e) => { updateProductState(e, "file", i); getImage(e.target.files, i) }}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
        <img src={img_display} alt="" />
      </ColumnsContainer2>
    )
  }
  const row1 = chunk1.map((product: Product, i: number) => {
    return (
      gerProductElement(product, i)
    )
  })
  const row2 = chunk2.map((product: Product, i: number) => {
    return (
      gerProductElement(product, i + 3)
    )
  })
  const onSave = async () => {
    productsData.map(async (product) => {
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
    })

  }
  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <ColumnsContainer>
        {row1}
      </ColumnsContainer>
      <ColumnsContainer>
        {row2}
      </ColumnsContainer>
      <EditButtons>
        <SaveButton onClick={onSave}>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default ProductsSection