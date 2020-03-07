import { configure, addParameters } from "@storybook/react"
import { addDecorator } from "@storybook/react"
import React from "react"
import { ThemeProvider } from "styled-components"
import { withOptions } from "@storybook/addon-options"
import { action } from "@storybook/addon-actions"
import theme from "./theme"
import { setAddon } from "@storybook/react"
import LiveEdit, { setOptions } from "storybook-addon-react-live-edit"
const loadStories = () => {
  require.context("../src", true, /\.(stories)|(story)\.tsx$/)
}

addDecorator(
  withOptions({
    name: "T485 Docs",
    url: "https://t485.org/",
    // hierarchySeparator: /\/|\./,
    // hierarchyRootSeparator: /\|/,
  })
)

// automatically import all files ending in *.stories.js
configure(loadStories, module)

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  console.log(".storybook config.js PATHNAME", pathname)
  action("NavigateTo")(pathname)
}
