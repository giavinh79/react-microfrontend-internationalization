# React Microfrontend & Webpack 5 Module Federation i18n Setup

## Description

This is a simple POC repo for setting up a "main" React 17 app (`react-main-container`) which consumes a React 17 microfrontend (`react-mfe`) using Webpack 5 module federation. The main purpose of this POC is to investigate internationalization (`react-i18next`) with this type of setup - and whether it is possible to colocate apps and their relevant translations (i.e. MFE owns its relevant translations).

For solving this, the `react-i18next` instance should be initialized in the main React 17 application and then passed down to the React 17 MFE. The MFE will then dynamically add its own translations to this existing i18n instance.

See PR for example where i18n instances are decoupled between main app and MFE.

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

## Additional Thoughts

**1. The approach**

I went with the approach of using the `i18n` provider to pass the initialized `i18n` instance down to the MFE from the main application. However, there may be other approaches to "exposing" this initialized `i18n` instance to any nested microfrontends.

Example 1 - Expose the initialized i18n instance (similar to how we expose via module federation) which the MFE imports. It then uses this instance in `Microfrontend.tsx` to dynamically trigger `addResourceBundle` outside of the component lifecycle. This way it's possible that we may no longer need `useEffect and useState` logic in `Microfrontend.tsx` or the i18n `<Provider >` within the main app (however other config would be needed as described above and depending on certain setups with microfrontends, this approach may not work). Ultimately, I think I would recommend the current approach used within this POC as it was pretty straightforward and we can easily implement a loading state.

**2. Performance**

`addResourceBundle` should execute fairly fast but assuming that the MFE owns and supports many namespace translations & locales, we would need to execute `addResourceBundle` for each of them. There may be value in testing extremely large locale/translation files with the current set-up to see whether there's a discernible performance impact and how we could improve it.

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
