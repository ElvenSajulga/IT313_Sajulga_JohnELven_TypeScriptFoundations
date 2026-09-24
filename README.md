# IT313 TypeScript Foundations

## Problem

This project is a TypeScript version of the Enrollment Eligibility Checker from Laboratory 2. It calculates the average grade of each enrollee and determines whether the student is Passing or on Probation.

## TypeScript Concepts Used

- Basic type annotations
- Interfaces
- Type aliases
- Enums
- Union types
- Optional properties
- Generics
- Async/await
- Try/catch

## Why They Were Used

Interfaces were used to define the structure of enrollee and report objects.

The EnrollmentStatus enum limits the possible enrollment statuses to Passing and Probation.

The union type allows the batch ID to be either a string or a number.

The optional remarks property is used only for students on probation.

The generic groupBy function allows typed data to be grouped by status.

Async/await and try/catch simulate retrieving enrollee data from a registrar API and handling possible connection errors.

## How to Run

Install the dependencies:

npm install

Run the program:

npx ts-node main.ts

Check for TypeScript errors:

npx tsc --noEmit