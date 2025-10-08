# DIRECTRICES DE DESARROLLO - LEER SIEMPRE ANTES DE CADA TAREA# DIRECTRICES DE DESARROLLO - LEER SIEMPRE ANTES DE CADA TAREA



## REGLAS OBLIGATORIAS## REGLAS OBLIGATORIAS



### 1. VERIFICACIÓN DE ERRORES### 1. VERIFICACIÓN DE ERRORES

- **SIEMPRE** verificar que no haya errores después de cada cambio usando `get_errors`- **SIEMPRE** verificar que no haya errores después de cada cambio usando `get_errors`

- **NUNCA** entregar trabajos con errores de compilación o sintaxis- **NUNCA** entregar trabajos con errores de compilación o sintaxis

- **OBLIGATORIO** corregir todos los errores antes de finalizar cualquier tarea- **OBLIGATORIO** corregir todos los errores antes de finalizar cualquier tarea



### 2. ESTILOS Y CSS### 2. ESTILOS Y CSS

- **PROHIBIDO** usar estilos inline (`style={{}}`)- **PROHIBIDO** usar estilos inline (`style={{}}`)

- **OBLIGATORIO** usar únicamente CSS modules- **OBLIGATORIO** usar únicamente CSS modules

- **PERMITIDO** usar data attributes para estilos dinámicos- **PERMITIDO** usar data attributes para estilos dinámicos

- **EJEMPLO CORRECTO**: `data-color={value}` + reglas CSS en .module.css- **EJEMPLO CORRECTO**: `data-color={value}` + reglas CSS en .module.css

- **EJEMPLO INCORRECTO**: `style={{ color: value }}`- **EJEMPLO INCORRECTO**: `style={{ color: value }}`



### 3. NEXT.JS Y REACT### 3. NEXT.JS Y REACT

- **OBLIGATORIO** usar App Router (no Pages Router)- **OBLIGATORIO** usar App Router (no Pages Router)

- **PROHIBIDO** usar `<a>` dentro de `<Link>` de Next.js- **PROHIBIDO** usar `<a>` dentro de `<Link>` de Next.js

- **OBLIGATORIO** usar imports relativos correctos- **OBLIGATORIO** usar imports relativos correctos

- **OBLIGATORIO** usar componentes modernos de React 19+- **OBLIGATORIO** usar componentes modernos de React 19+



### 4. FLUJO DE TRABAJO### 4. FLUJO DE TRABAJO

- Leer estas directrices ANTES de cada tarea- Leer estas directrices ANTES de cada tarea

- Planificar cambios múltiples usando `multi_replace_string_in_file`- Planificar cambios múltiples usando `multi_replace_string_in_file`

- Verificar errores después de cada modificación- Verificar errores después de cada modificación

- No preguntar innecesariamente, actuar y corregir- No preguntar innecesariamente, actuar y corregir



### 5. CALIDAD DEL CÓDIGO### 5. CALIDAD DEL CÓDIGO

- Mantener estructura limpia y organizada- Mantener estructura limpia y organizada

- No duplicar código- No duplicar código

- Usar TypeScript correctamente- Usar TypeScript correctamente

- Seguir mejores prácticas de Next.js/React- Seguir mejores prácticas de Next.js/React



## RECORDATORIO PERMANENTE## RECORDATORIO PERMANENTE

Estas reglas son OBLIGATORIAS y deben seguirse en TODOS los casos, sin excepción.Estas reglas son OBLIGATORIAS y deben seguirse en TODOS los casos, sin excepción.