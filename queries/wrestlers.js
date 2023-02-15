const db = require('../db/dbConfig.js')

const getAllWrestlers = async () => {
    try {
        const allWrestlers = await db.any('SELECT * FROM wrestlers');
        return allWrestlers
    } catch (error) {
        return (error)
    }

}

const getWrestler = async (id) => {
    try {
        const wrestler = await db.one('SELECT * FROM wrestlers WHERE id=$1', id)
        return wrestler
    } catch (error) {
        return error
    }
}

const createWrestler = async (wrestler) => {
    let { name, birth_date, debut_date, gender, height, weight, billed_from, cagematch_page, recommended_match, image } = wrestler
    try {
        if (!image) image = 'https://unsplash.com/photos/PTv-B97DHNI'
        const newWrestler = await db.one('INSERT INTO wrestlers (name, birth_date, debut_date, gender, height, weight, billed_from, cagematch_page, recommended_match, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [name, birth_date, debut_date, gender, height, weight, billed_from, cagematch_page, recommended_match, image])
        return newWrestler
    } catch (error) {
        return error;
    }
}

const deleteWrestler = async (id) => {
    try {
        const deletedWrestler = await db.one('DELETE FROM wrestlers WHERE id=$1 RETURNING *', id)
        return deletedWrestler
    } catch (error) {
        return error
    }
}

const updateWrestler = async (id, wrestler) => {
    try {
        const updatedWrestler = await db.one('UPDATE wrestlers SET name=$1, birth_date=$2, debut_date=$3, gender=$4,height=$5, weight=$6, billed_from=$7, cagematch_page=$8, recommended_match=$9, image=$10 WHERE id=$11 RETURNING *', [
            wrestler.name,
            wrestler.birth_date,
            wrestler.debut_date,
            wrestler.gender,
            wrestler.height,
            wrestler.weight,
            wrestler.billed_from,
            wrestler.cagematch_page,
            wrestler.recommended_match,
            wrestler.image,
            id,
        ])
        return updatedWrestler
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllWrestlers,
    getWrestler, 
    createWrestler,
    deleteWrestler,
    updateWrestler,
}