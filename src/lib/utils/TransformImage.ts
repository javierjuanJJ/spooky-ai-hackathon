'use client'
const {
    REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME,
} = process.env;


const PROMPTS = [
    "Change all persons into a ghosts",
    "Change all persons into a Carved pumpkins",
    "Change all persons into a Witch hat",
    "Change all persons into a Fake spider webs",
    "Change all persons into a Fake spider webs",
    "Change all persons into a Decorative skeletons",
    "Change all persons into a Bats",
    "Change all persons into a Fake tombstones and graves",
    "Change all persons into a Zombie hands rising from the ground",
    "Change all persons into a Fake blood and horror masks",

]

function convertToUrl(array: String[],spookyQuantity: number) {
    return array[spookyQuantity - 1].replaceAll(" ", "%20");
}

export function ImageTransform(parse, spookyQuantity, callback) {
    const publicId = parse['public_id']
    console.log("Public_id a publicar: ", publicId)

    callback(`https://res.cloudinary.com/${REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_gen_background_replace:prompt_${(convertToUrl(PROMPTS,spookyQuantity))}/${publicId}.jpg`)
}