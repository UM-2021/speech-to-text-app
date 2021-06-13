# speect-to-text-app

Proyecto de la materia Ingenieria de Software II.

## Testing en el celular pero con el servidor local

Para poder acceder al servidor de AWS desde el celular tuve que poner que siempre que la aplicacion se este corriendo desde un celular. Para poder testear con el server local hay que hacer un cambio manual a un archivo.

> Se que no es la mejor manera, pero por ahora es lo que pude hacer.

En el archivo `src/utils/axios.ts`  cambiar el valor de la variable `BASE_URL`.

```javascript
# Normal
const BASE_URL = isPlatform('capacitor') ? 'https://testpagos.tk' : 'http://localhost:8000';

# Cambiado
const BASE_URL = 'http://localhost:8000';
```

## Generar imagenes para android

No subimos las imagenes a github porque son muchas, ya que capacitor genera de todo tamaño y color para matchear con todos los devices.
Para poder generar las imagenes para probar, corran el siguiente comando:

```bash
npx cordova-res android --skip-config --copy
```
