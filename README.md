# Project Name

**Nappbnb**

An airbnb clone room listing page including four main components:
* title gallery
* description-listing
* booking-servie
* reviews
* filter-listing

## Related Projects

  - Proxy: https://github.com/n-app/Proxy_DavidChen

  - Title Gallery: https://github.com/n-app/titleGallery
  - Description Listing: https://github.com/n-app/N-appbnb-description-listing
  - Booking: https://github.com/n-app/booking-service
  - Reviews: https://github.com/n-app/reviews
  - Filter Listing: https://github.com/n-app/filter-listings-ryan

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

* clone the github repo to your local drive
* Form within in the root directory:
```sh
npm run react-dev
npm run dev-server
```

## Technical Highlights

* webpack
* react
* redux and redux-saga
* docker + EBS
* axios
* Jest

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).
(not applicable)

- Node 10.2.1
- mysql 5.7

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Inserting initial mock data

From within the root directory:

```sh
mysql -u [username] -p [password] < database/schema.sql
node database/insertMockData.js
```
