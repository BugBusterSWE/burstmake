# Burstmake
Burstmake is a tool to manage your [TypeScript](http://www.typescriptlang.org) project when there are more indipendent parts.
In this case, the solution is either creating one `tsconfig.json` file **for each** subpart or use another tool to have a pretty manage.
Burstmake wants to simplify everything using one file: **burstmake.json**.

## Use case
Imagine a project as below:
```
root
|-- front 
|   |-- src
|   |-- test
|    
|-- back
    |-- src
    |-- test
```
now, to compile all the four parts you need one tsconfig.json file for `front/src`, `front/test`, `back/src` and `back/test` which have the options to translate from TypeScrip to JavaScript.

This is a mistake! In the worst case you have the same options for four files.

As tell you above, Burstmake wants to bring new, better, solution.



