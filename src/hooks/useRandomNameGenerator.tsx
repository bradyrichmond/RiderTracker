import Haikunator from "haikunator"
import { useMemo, useState } from "react"
import { animals } from '@/constants/Animals'
import { adjectives } from '@/constants/Adjectives'

export const useRandomNameGenerator = (seed: string = 'default') => {
    const [randomName, setRandomName] = useState<string>('')
    
    const initialize = () => {
        const haikunator = new Haikunator({ adjectives, nouns: animals, defaults: { tokenLength: 0, delimiter: ' ' } })
        return haikunator
    }

    // only initialize when seed changes, which it shouldn't
    const generator = useMemo(() => {
        return initialize()
    }, [seed])

    const generateRandomName = () => {
        const newRandomName = generator.haikunate()
        setRandomName(newRandomName)
    }

    // generate a new random name when the generator is initialized
    useMemo(() => {
        generateRandomName()
    }, [generator])

    return {
        generateRandomName,
        randomName
    }
}