/**
Create a union of the given collection's values.

@example
```
// main.ts
const data = { 'foo': 0, 'bar': 1, 'biz': 2 }
type DataValue = ValueOf<typeof data>
// => 0 | 1 | 2
    
const list = [ 3, 4, 5 ]
type ListValue = ValueOf<typeof list>
// => 3 | 4 | 5
```

@category Collection
*/
export type ValueOf<T> = T extends ArrayLike<infer D> ? T[number] : T[keyof T]
