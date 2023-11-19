const {Schema, model } = require('mongoose')

const pokedexSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    generation: {
        type: Number
    },
    game: {
        type: String,
        required: true,
    },
    is_emulator: {
        type: Boolean
    },
    pokemon: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pokemon'
        }
    ]
})
const Pokedex = model('Pokedex', pokedexSchema)

module.exports = Pokedex