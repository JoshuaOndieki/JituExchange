# JituExchange

[![DeepScan grade](https://deepscan.io/api/teams/21091/projects/24818/branches/767576/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21091&pid=24818&bid=767576)  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/915df3d65dce4de99d951b98aed0adec)](https://app.codacy.com/gh/JoshuaOndieki/JituExchange/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)  [![Maintainability](https://api.codeclimate.com/v1/badges/21c2d6cf64a286bec13c/maintainability)](https://codeclimate.com/github/JoshuaOndieki/JituExchange/maintainability) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/JoshuaOndieki/JituExchange/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/JoshuaOndieki/JituExchange/tree/main)    [![codecov](https://codecov.io/gh/JoshuaOndieki/JituExchange/branch/main/graph/badge.svg?token=bUUlsJmXDm)](https://codecov.io/gh/JoshuaOndieki/JituExchange)

A lite Version of Stack Overflow

## Design - Figma

[Link to **Jitu**Exchange Figma designs](https://www.figma.com/file/q9AedsAJNIKBq2WE1FV1G9/JituExchange?type=design&t=qZMzWbc3PWJVdNlX-1)

## Frontend - Angular - AWS S3

[Link to **Jitu**Exchange Angular Frontend](http://jituexchange.s3-website-us-east-1.amazonaws.com)

Locally, run `npm run dev`

## Backend - Expressjs - AWS Fargate

Run `npm run build && npm start`

For development, `npm run dev`

## Database - MSSQL - Azure

To setup database, cd into database folder and run the script > `bash setup.sh`

Use the **-i** flag to create or recreate the database

Use the `patch` command to only execute stored procedures e.g `bash setup.sh patch`

By default this sets up the **development** database, however you can specify the database with flags or env variable `DB_NAME`

Without the exported variable name:

**-t** flag uses a db called testing `bash setup.sh -t`

**-p** flag uses a db called production `bash setup.sh -p`

## Env

Exporting these environment variables work in all microservices where needed. Alternatively, have a **.env** file in every microservice and add them.

```env
DB_USER (required in backend, background, and db)
DB_PWD (b, bg, db)
DB_NAME (b, bg, db) if not provided, a db called development will be used.
DB_SERVER (b, bg, db)
SECRET_KEY (b)
NG_QUESTION_LINK (bg) a workaround to send question links in email.
```

## Background Services - AWS Fargate

For background services, if using privateemail as host, only add `NAMECHEAP_EMAIL` and `NAMECHEAP_PASSWORD` variables. For Gmail and the rest, please modify `background/src/utils/nodemailer.ts` by replacing namecheapConfig with the appropriate configuration.

## ACKNOWLEDGMENT

- Trainer - [Jonathan Ndambuki](https://github.com/joe6276)
- [THE Jitu](https://thejitu.com)
