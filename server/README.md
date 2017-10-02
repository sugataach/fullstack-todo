# Todo Server

## ❯ Design Overview
- `PostgreSQL` as persistence layer
- `SQLAlchemy` as data access layer
- `Flask` as the API layer
- When adding a new resource, id is incremented and then resource
  written under that id. This means that resource ids will always be monotonically increasing.

## ❯ API
```bash
# List all Todos
#
# Returns all Todo objects [List of Maps]
# HTTP 200
GET /api/v1/todo

# Create new Todo
#
# Plaintext POST contents are inserted as the text
# and an id auto-generated and assigned
#
# Returns the newly created Todo object [List of Maps]
# HTTP 200
POST /api/v1/todo

# Toggle the status of the Todo with id={id}
#
# Inverts the 'status' of the Todo object
#
# Returns the updated Todo object [List of Maps]
# HTTP 200
PUT /api/v1/todo/{id}

# Update the status of all Todos to 'completed'
#
# Returns an empty response
# HTTP 200
PUT /api/v1/todo/complete

# Update the position of the Todo with id={id}
#
# Plaintext PUT content contains the new position
#
# Returns all Todo objects [List of Maps]
# HTTP 200
PUT /api/v1/todo/{id}/reorder

---

REQUEST BODY (POST example)
{
  "text": "{text}",
  ...
}

RESPONSE BODY
[
  {
    "id": "{id}",
    "position": {position},
    "status": "{status}",
    "text": "{text}",
  },
  ...
]
```
