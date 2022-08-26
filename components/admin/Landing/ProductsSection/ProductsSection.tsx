import React, { useState } from 'react'
import { saveProductsData } from '../../../../store/actions/LandingActions';
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
  const gerProductElement = ({ clickURL, imgURL, title, subtitle }: Product, i: number) => {
    return (
      <ColumnsContainer2>
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
            onChange={(e) => updateProductState(e, "subtitle", i)}
            value={subtitle}
            placeholder="Desde $ 12.00"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Página del Producto
          </EditText>
          <EditInput
            onChange={(e) => updateProductState(e, "clickURL", i)}
            value={clickURL}
            placeholder="https://google.com"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Imagen del Producto
          </EditText>
          <FolderInput
            onChange={(e) => updateProductState(e, "file", i)}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
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
    const success = await saveProductsData(productsData)
    let alertText = "Cambios realizados correctamente"
    if (!success) {
      alertText = "Hubo un error"
    }
    alert(alertText)
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