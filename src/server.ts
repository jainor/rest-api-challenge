import { app } from './app'

const PORT = process.env.API_PORT || 8080
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
})
