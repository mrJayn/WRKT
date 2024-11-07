/*
JavaScript Truthy-Falsy Chart 
* boolean             |    false            |    true
* string                |    ""                 |    any other string
* number             |    0,-0, NaN    |    any other number
* null                   |    always         |    never
* undefined         |    always        |    never
* Other Objects  |    never          |    always
  ( includes {},[] )
*/

type Falsy = false | 0 | '' | null | undefined
