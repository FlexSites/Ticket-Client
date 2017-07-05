# Persistant incremental workflows

1. Single table with non-validated schema and events to programmatically validate and mark the object "validated"
    - Pros:
      - validate (business logic) in code
      - event driven
    - Cons:
      - Potential leaks of non-valid data with bad queries
      - Extra query overhead
      - Extra DB write

2. Two tables per-resource, one is schema validated, one is "pending" move between on update after validation
    - Pros:
      - Simple queries (list)
    - Cons:
      - Update complexity, two queries per write to determine object location, have to choose when to move objects between tables

3. Client (localstorage) persisted until it's valid, one schema validated table
    - Pros:
      - No server-side changes from regular data validation
    - Cons:
      - Potential loss of client data
      - Can't multi-device, multi-session
