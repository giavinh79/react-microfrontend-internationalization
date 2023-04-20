# React Microfrontend & Webpack 5 Module Federation i18n Setup

## Description

This is a simple POC repo for setting up a "main" React 17 app (`react-main-container`) which consumes a React 17 microfrontend (`react-mfe`) using Webpack 5 module federation. The main purpose of this POC is to investigate internationalization (`react-i18next`) with this type of setup - and whether it is possible to colocate apps and their relevant translations (i.e. MFE owns its relevant translations).

For solving this, one approach can be where the `react-i18next` instance is initialized in the main React 17 application and then passed down to the React 17 MFE. The MFE will then dynamically add its own translations to this existing i18n instance. Effectively, they have a "shared" i18 instance.

Alternatively, we may prefer having more independent MFEs where they manage their own i18n instance setup. Although it will no longer (out of the box) sync language changes from the main app and config, we now have boundaries between different apps and can avoid problems with having a "global" i18n instance (mutations and conflicts). See PR for example where i18n instances are decoupled between main app and MFE: https://github.com/giavinh79/react-microfrontend-internationalization/pull/2

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

3. Go to `localhost:4000` & click on the button to toggle between English & French locales.

## Overview

1. The main application, `react-main-container`, defines in `webpack.config.js` microfrontends it will consume.
2. The MFE, `react-mfe`, exposes `Microfrontend.tsx` in `webpack.config.js` so that it can be imported by `react-main-container`.
3. `react-main-container` initializes two namespaces: `common` and `app`
4. `react-mfe` initializes one namespace: `app`

## Results

1. MFE _CAN_ access namespaces from main application
2. MFE _IS_ able to add its namespace to the main i18n instance. It uses `addResourceBundle` which executes synchronously.

## Reference

Sharing assets between MFE & Host and more:
- https://github.com/module-federation/module-federation-examples/issues/697
- https://github.com/manfredsteyer/module-federation-plugin-example/issues/21
- https://stackoverflow.com/questions/71087541/angular-module-federation-how-can-i-make-static-files-assets-i18n-available
- https://stackoverflow.com/questions/67633345/serving-styles-and-assets-with-webpack-5-module-federation
- https://stackoverflow.com/questions/69192229/angular-mfe-webpack5-module-federation-image-path-issue
- https://itsnotbugitsfeature.com/2022/03/13/sharing-common-assets-in-angulars-module-federation/
- https://dev.to/waldronmatt/tutorial-a-guide-to-module-federation-for-enterprise-n5
- https://scriptedalchemy.medium.com/micro-fe-architecture-webpack-5-module-federation-and-custom-startup-code-9cb3fcd066c
- https://github.com/module-federation/module-federation-examples/issues/102
