# JSON CV Core

[![GitHub Releases](https://badgen.net/github/tag/jsoncv/core)](https://github.com/jsoncv/core/releases)
[![NPM Release](https://badgen.net/npm/v/@jsoncv/core)](https://www.npmjs.com/package/@jsoncv/core)

This package contains the core functionality related to JSON CV such as CLI, GUI, templates etc.

## Contents
- [Installation](#installation)
- [Toolset](#toolset)
  - [CV Validator](#json-cvs-validator)

## Installation

```shell
npm install --save @jsoncv/core
# or
yarn add @jsoncv/core
```

## Toolset

### JSON CV's Validator

Validator can be used to validate a JSON CV.

```ts
import { validator } from '@jsoncv/core'

const cv  // ... Loaded CV from someplace local or online
validator(cv)
```
