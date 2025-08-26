# Catalogo UC JSON
<!-- https://stackoverflow.com/a/73422089 -->
[![License badge](https://img.shields.io/badge/license-MIT-8A2BE2)](/LICENSE)
<picture>
  <img alt="Version badge" src="https://img.shields.io/github/v/tag/k0rval4n/catalogo-uc-json?label=version&color=green">
</picture>

## Overview

Catalogo UC JSON is a data fetcher for the course catalog of the Pontificia Universidad Católica de Chile (UC) in JSON format.

## Table of Contents

- [Overview](#overview)
- [Installation and Execution](#installation-and-execution)
  - [Install](#install)
  - [Use](#use)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)

## Installation and Execution

### Install
```
npm install @k0rval4n/catalogo-uc-json
```

### Use
1. Import `CourseDataParser` in your project and use it:
   ```js
    import { CourseDataParser } from "./index.js";

    const SIGLA = "IIC2233";

    const showData = async () => {
      const courseDataParser = new CourseDataParser();
      const data = await courseDataParser.getData(SIGLA);
      console.log(data);
    };

    showData();

   ```
    - `CourseDataParser.getData(sigla: string)` receives one parameter, the `sigla` of the desired course.
    - It returns a object in `JSON` format:
        ```js
        {
          Prerequisites: 'IIC1103 o IIC1102',
          Prerequisites_and_restrictions_relation: 'No tiene',
          Restrictions: 'No tiene',
          Equivalences: '(IIC1222)',
          Course_name: 'PROGRAMACION AVANZADA',
          Translation: 'ADVANCED COMPUTER PROGRAMMING',
          Sigla: 'IIC2233',
          Credits: '10',
          Modules: '03',
          Course_nature: 'MINIMO'
        }
        ```

## Technologies Used

- **Node.js**: JavaScript runtime
- **JSDOM**: HTML parsing

## License
This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please follow these steps:
> [!IMPORTANT]
> Valid ```<prefix>``` are:
> - ```feat```: when you are adding a new feature.
> - ```fix```: when you are patching a bug.

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b <prefix>/feature-name
   ```
3. Commit your changes and push to your fork.
4. Open a pull request when your changes are ready to be reviewed.
> [!IMPORTANT]
> PR names must start with a verb and description must follow the template.
