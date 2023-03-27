# React Microfrontend & Webpack 5 Module Federation Setup

## Description

This is a simple POC repo for setting up a "main" React 17 app (`react-main-container`) which consumes a React 17 microfrontend (`react-mfe`) using Webpack 5 module federation. The main purpose of this POC is to investigate internationalization (`react-i18next`) with this type of setup - and whether it is possible to colocate apps and their relevant translations (i.e. MFE owns its relevant translations).

For solving this, the `react-i18next` instance should be initialized in the main React 17 application and then passed down to the React 17 MFE. The MFE will then dynamically add its own translations to this existing i18n instance.

## Running

1. Run the microfrontend (runs on `localhost:5000`)
  - `cd react-mfe`
  - `yarn`
  - `yarn start`
  - Since `react-mfe` leverages the `i18n` instance from `react-main-container`, it cannot run independently. Solving this is not within the scope of this POC.

2. Run the main app (runs on `localhost:4000`)
  - cd `react-main-container`
  - `yarn`
  - `yarn start`

3. Click on button to toggle between English & French locales.

## Overview

1. The main application, `react-main-container`, defines in `webpack.config.js` microfrontends it will consume.
2. The MFE, `react-mfe`, exposes `Microfrontend.tsx` in `webpack.config.js` so that it can be imported by `react-main-container`.
3. `react-main-container` initializes two namespaces: `common` and `app`
4. `react-mfe` initializes one namespace: `app`

## Results
1. MFE *CAN* access namespaces from main application
2. MFE *IS* able to add its namespace to the main i18n instance. It uses `addResourceBundle` which executes synchronously.

## Improving

I went with the approach of using the `i18n` provider to pass the initialized `i18n` instance down to the MFE from the main application. However, there is a second approach which *could* be better.

**To investigate**: Pass the initialized i18n instance down to the MFE as a prop (or expose it through the main application), import it in `Microfrontend.tsx`, and dynamically trigger `addResourceBundle` using that imported instance outside of the component. This way we may no longer need the `useEffect and useState` logic in `Microfrontend.tsx` or the i18n `<Provider >` in the main app. It's important to consider that depending on different setups, some approaches may not work.
