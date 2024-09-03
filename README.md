# So-So-Social-Network

Just an ok social networking app

## Description

This is a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The backend is built using Express.js, MongoDB, and Mongoose.

## API

### Users

- Get all users: GET /api/users
- Get a single user by ID: GET /api/users/:id
- Create a new user: POST /api/users
- Update a user by ID: PUT /api/users/:id
- Delete a user by ID: DELETE /api/users/:id
- Add a friend to a user’s friend list: POST /api/users/:userId/friends/:friendId
- Remove a friend from a user’s friend list: DELETE /api/users/:userId/friends/:friendId

### Thoughts

- Get all thoughts: GET /api/thoughts
- Get a single thought by ID: GET /api/thoughts/:id
- Create a new thought: POST /api/thoughts
- Update a thought by ID: PUT /api/thoughts/:id
- Delete a thought by ID: DELETE /api/thoughts/:id
  -Add a reaction to a thought: POST /api/thoughts/:thoughtId/reactions
- Remove a reaction from a thought: DELETE /api/thoughts/:thoughtId/reactions/:reactionId

## License

MIT

## Repo

https://github.com/stump297/So-So-Social-Netowrk

## Questions

For questions or collaberation, please email me at aorf@femmeosage.net
