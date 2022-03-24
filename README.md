# 👉 [lottie interaction demo](https://brettlyne.github.io/lottie-interaction-demo/) 👈

## Running dev server

```
npm start
```

## Build

```
npm run build
```

## note on importing lottie

```import lottie from "lottie-web";```  
*lottie gzipped adds ~ 60k* 

vs

```import lottieLight from "lottie-web/build/player/lottie_light";```   
*lottie_light gzipped adds ~ 40k* 
