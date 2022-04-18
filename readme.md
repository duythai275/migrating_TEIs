# Migrating Tracked Entity Instances

Requirements: NodeJS
Installation: Run `npm install`

## Overview

Migrating TEIs include Enrollments and Events from an DHIS2 intance to another instance. You can transform the data by purpose before importing the original data to the destination instance.

## `config.js`

- baseURL: The URL of the original instance, where the data is getting from
- baseAuthorization: Use `btoa(username:password)` to get the authoration,
- baseProgram: The program will be used to get TEIs,
- baseOrgUnit: The specified orgUnit for getting TEIs. Notice: the sccript will get data of this orgunit and its descendant orgUnit,
- basePayloadSize: For the performance, limit the number of TEIs when fetching or importing,
- destinationURL: The URL of the instance, where the data is importing to,
- destinationAuthorization: Use `btoa(username:password)` to get the authoration

## Workflow

### Run `node fetchingData.js`

It will download all TEIs include Enrollments and Events from the original instance to the directory `originalData`. All TEIs are seperated in many files with limit of number TEIs (`basePayloadSize`) in each file you defined in `config.js`.

### Run `node transformingData.js`

Base on the requirement, the script will transform the data to make it right for the destination instance. After transforming, it will be stored in the `updatedData` directory.

### Run `node importingData.js`

The script will import the transformed data. Then return the result of the importing process. You can check the results in `results` directory in order to fix any error occured after importing. For example: the program is not assigned to some orgUnits in the destination instance.

### Notice

The `originalData` and `updatedData` directories are used in case if there are many wrong with your importing. For example: your transforming script is missing or doing wrong data elements or attributes. You can use those for restoring or fixing the data.
