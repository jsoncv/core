# JSON CV Core

[![GitHub Releases](https://badgen.net/github/tag/jsoncv/core)](https://github.com/jsoncv/schema/releases)
[![NPM Release](https://badgen.net/npm/v/@jsoncv/core)](https://www.npmjs.com/package/@jsoncv/schema)

This package contains the core functionality related to JSON CV such as CLI, GUI, templates etc.

## Contents
- [Installation](#installation)
- [Toolset](#toolset)
  - [CV Validator](#validator)

## Installation

<a name="installation"></a>

```shell
npm install --save @jsoncv/core
# or
yarn add @jsoncv/core
```

## Toolset

<a name="toolset"></a>

### JSON CV's Validator

<a name="validator"></a>

Validator can be used to validate a JSON CV.

```ts
import { cvValidator } from '@jsoncv/core'
```

```ts
const cv // Loaded CV from someplace local or online
cvValidator(cv)
```
