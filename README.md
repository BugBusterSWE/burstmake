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
now, to compile all the four parts you need a tsconfig.json file for `front/src`, `front/test`, `back/src` and `back/test`, which have the options to translate from TypeScript to JavaScript.

This is a mistake! In the worst case you have the same options for four files.
 
As said above, Burstmake wants to bring a new, better, solution.

Before explaining what to do, we must introduce the concept of **topic** and **hotpoint** ( jump to the technical section if you don't need the explanation ).

#### Topic
The topic is the set of TypeScript rules to apply to the hotpoint. One topic has the same content of a TypeScript configuration but with some differences.
 
The most important property of a topic is the possibility to **extend** it, in this way the problem of making multiple tsconfig files with the same options is resolved.




