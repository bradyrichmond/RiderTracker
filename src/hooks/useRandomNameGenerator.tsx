import Haikunator from 'haikunator'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { animals } from '@/constants/Animals'
import { adjectives } from '@/constants/Adjectives'

export const useRandomNameGenerator = (seed: string = 'default') => {
    const [randomName, setRandomName] = useState<string>('')

    const generator = useMemo(() => new Haikunator({ adjectives, nouns: animals, defaults: { tokenLength: 0, delimiter: ' ' }, seed }), [seed])

    const generateRandomName = useCallback(() => {
        const newRandomName = generator.haikunate()
        setRandomName(newRandomName)
    }, [generator])

    // generate a new random name when the generator is initialized
    useEffect(() => {
        generateRandomName()
    }, [generator, generateRandomName])

    return {
        generateRandomName,
        randomName
    }
}