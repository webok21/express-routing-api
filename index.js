const express = require('express')
const app = express()
const movies = require('./movies')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/movies', (req, res) => {
    res.sendFile('./views/movies.html', { root: __dirname })
})

app.get('/movies/api', (req, res) => {
    res.json(movies)
    console.log(res.json(movies))
})

app.get('/movies/api/:year', (req, res) => {
    // res.send(req.params.year)
    // res.json(movies[req.params.year])
    const filterByYear = movies.movies.filter(function (year) {
        return year.year == req.params.year
    })
    res.send(filterByYear)
})

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
})