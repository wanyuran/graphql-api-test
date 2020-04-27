export default {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'PaginationItem',
        possibleTypes: [
          {
            name: 'Presentation'
          },
          {
            name: 'Session'
          }
        ]
      }
    ]
  }
}
