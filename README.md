# Burstmake
Burstmake is a tool to manage your [TypeScript](http://www.typescriptlang.org) project when there are more indipendent parts.
In this case, the solution is either creating one `tsconfig.json` file **for each** subpart or using another tool to have a pretty manage.
Burstmake wants to simplify everything using one file: **burstmake.json**.

## Sections
* [Installing and use](#installing-and-use)
* [Summary](#summary)
 * [Topic](#topic)
 * [Hotpoint](#hotpoint)
* [Schema](#schema)

### Installing and use
For the latest stable version:
```
npm install -g burstmake
```

and run:
```
burstmake
```

in the **root** of project to create the tsconfig.json files from **burstmake.json** file.

### Summary
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

Before explaining what to do, we must introduce the concept of **topic** and **hotpoint**.

#### Topic
The topic is the set of TypeScript rules to apply to the hotpoint. One topic has the same content of a TypeScript configuration but with some differences.
 
The most important property of a topic is the possibility to **extend** it for creating a hierarchy of topics, in this way the problem of making multiple tsconfig files with the same options is resolved.

Another property of topics is that the paths are relative to the **root** of the project. This is very useful and it doesn't meet the tedious problem to resolve pesky relative path. 

The example below shows how to write a topic:
```json
{
    "common": {
        "compilerOptions": {
            "target": "es5",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true
        }
    },

    "front_t": {
        "base": "common",
    
        "compilerOptions": {
            "module": "amd",
            "outFile": "built/app.js"
        }
    },
    
    "back_t": {
        "base": "common",
        
        "compilerOptions": {
            "module": "commonjs"
        }
    }
}
```

When Burstmake runs, `front_t` and `back_t` will inherite all compiler options from `common` topic.
If a declaration is both in a parent topic and in a children topics, the children topic's declaration will be used. In the case above, `front_t` and `back_t` become:

```json
{
    "front_t": {
        "compilerOptions": {
            "target": "es5",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true,
            "module": "amd",
            "outFile": "built/app.js"
        }
    }
}
```

```json
{
    "back_t": {
        "compilerOptions": {
            "target": "es5",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true,
            "module": "commonjs"
        }
    }
}
```

#### Hotpoint
Alright, now we have learned how to write a topic and use inheritance to avoid multiple similar tsconfig.json files, how do we specify the subsets of the project in which we want to use it?

Well, is simple. In the burstmake.json file there must be a `hotpoint` attribute where are indicated the directories of project to use as topics.

This is an example:
```json
{
    "hotpoint": {
        "front_t": "./front/",
        "back_t": "./back/"
    },

    "common": {
    
    },
    
    "front_t": {
    
    },
    
    "back_t": {
    
    }
}
```
If you run burstmake in the `front/` and `back/` directory you should find a tsconfig.json file with the correct configuration. As you can see the `common` topic is not inserted in the hotpoint section, it is only a topic from which taking information about the common configurations.

Note: the `/` is important, make sure you won't forget it.

### Schema
The structure of **burstmake.json** file is:
```json
{
    "hotpoint": {
        "topic_declared": "path_with_final_slash"
    },
    
    "topic": {
        "base": "some_topic",
        
        "compilerOptions": {
        },
        
        "include": [
            "file outside of topic, useful for .d.ts definitions in the form:
	    path/of/the/source.*"
        ],
        
        "exclude": [
            "use minimatch expression to ignore files or 
	    directories in the topic folder"
        ],
    }
}
```

The `compilerOptions` attribute is the compilerOptions of a tsconfig.json file but for now it supports only:
* module
* target
* moduleResolution
* noImplicitAny
* removeComments
* preserveConstEnums
* outDir
* outFile
* sourceMap
* declaration
* noEmitOnError

