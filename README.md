# Vesper - TypeScript Advanced Example

1. clone repository
2. run `npm i`
3. run `npm start`
4. create a category:
```gql
mutation CategorySave {
  categorySave(name: "Hello") {
    id
  }
}
```

5. create a post with a category, get `categoryNames` in the response:
```gql
mutation PostSave {
  postSave(title: "lol", text: "lol2", categoryIds: [1]) {
    id
    categories {
      id
      name
    }
    categoryNames
  }
}

```

6. vesper throws following error after running mutation:

```gql
{
  "data": {
    "postSave": {
      "id": 4,
      "categories": [
        {
          "id": 1,
          "name": "Hello"
        }
      ],
      "categoryNames": null
    }
  },
  "errors": [
    {
      "message": "Query runner already released. Cannot run queries anymore.",
      "locations": [
        {
          "line": 8,
          "column": 5
        }
      ],
      "path": [
        "postSave",
        "categoryNames"
      ]
    }
  ]
}
```