# JSON CV Core

[![GitHub Releases](https://badgen.net/github/tag/jsoncv/core)](https://github.com/jsoncv/core/releases)
[![NPM Release](https://badgen.net/npm/v/@jsoncv/core)](https://www.npmjs.com/package/@jsoncv/core)

This package contains the core functionality related to JSON CV such as CLI, GUI, templates etc.

## Contents
- [Installation](#installation)
- [Toolset](#toolset)
  - [CV Validator](#json-cvs-validator)
  - [Template Server](#json-cvs-template-server)
  - [Export to HTML](#json-cvs-export-to-html)

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

const cvLocation  // ... Location or URL of a JSONCV file
validator(cvLocation)
        .then(() => {
            // Successs
        })
        .catch(Errors => {
            // Failure
        })
```

### JSON CV's Template Server

Server will load a valid JSON CV and a valid template and serves them as a web service.

```ts
import { server } from '@jsoncv/core'

const cvLocation  // ... Location or URL of a JSONCV file
const template  // ... Location of a valid JSONCV template or name of a globally installed template
const port  // ... server port number
server.serve(template, cvLocation, port)
```

### JSON CV's Export to HTML

The exporter will load a valid JSON CV and a valid template and save the converted version as HTML file.

```ts
import { exportToHtml } from '@jsoncv/core'

const cvLocation  // ... Location or URL of a JSONCV file
const template  // ... Location of a valid JSONCV template or name of a globally installed template
const outputLocation  // ... Location of the output HTML file
exportToHtml(template, cvLocation, outputLocation)
```
