# Burstmake
Burstmake is a tool to manage your [TypeScript](http://www.typescriptlang.org) project when there are more indipendent parts.
In this case, the solution is either creating one `tsconfig.json` file **for each** subpart or use another tool to have a pretty manage.
Burstmake wants to simplify everything using one file: **burstmake.json**.

## Sections
* [Use Case](#use-case)
 * [Topic](#topic)
 * [Hotpoint](#hotpoint)
* [Schema](#schema)

### Use Case
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

Another property of topics is that the paths are relative to the **root** of project. This is very useful and it don't meet the tedious problem to resolve pesky relative path. 

The example below show how to write a topic:
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

When Burstmake will runs, `front_t` and `back_t` will inherite all compiler options by `common` topic.
If a declaration is both in a parent topic and in a children topic, the children topic's declaration will use. In the case above,  `front_t` and `back_t` become this:

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
            "outFile": "app.js"
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
Ok, now we have been learning to write a topic and use inheritance to avoid multiple similary tsconfig.json files, but how specify in what subset of the project use it?

Well is simple, in the burstmake.json be must present a `hotpoint` attribute where are indicate the directories of project to use as topics.

This is a examplvenire PUOI Notaree:
```json
{
    "hotpoint": {
        "front_t": "front/",
        "back_t": "back/"
    },

    "common": {
    
    },
    
    "front_t": {
    
    },
    
    "back_t": {
    
    },
}
```
Now, if you run burstmake in the `front/` and `back/` directory should find a tsconfig.json file within the correct configuration. As you can see the `common` topic is not insert in the hotpoint section, it is only a topic where taking informations about the common configurations.

Note: the `/` is important, no forgetting.

### Schema
The structure of **burstmake.json** file is as below:
```json
{
    "hotpoint": {
        "topic_declared": "path_with_final_slah"
    },
    
    "topic": {
        "base": "some_topic",
        
        "compilerOptions": {
        },
        
        "include": [
            "file outside of topic, useful for .d.ts definitions"
        ],
        
        "exclude": [
            "use minimatch expression to ignore files or directories in the topic folder
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
