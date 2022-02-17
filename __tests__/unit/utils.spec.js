const { validateAmount, generateToken, getDays, validateMeterNumber } = require('../../src/utils/common.util');


describe("Testing inputs", () => {
    test('Validating Amount Input', async () => {
        expect(validateAmount(0)).toStrictEqual(false)
        expect(validateAmount(50)).toStrictEqual(false)
        expect(validateAmount(100)).toStrictEqual(true)
        expect(validateAmount(200)).toStrictEqual(true)
        expect(validateAmount(10000)).toStrictEqual(true)
        expect(validateAmount(100 * 365 * 5)).toStrictEqual(true)
        expect(validateAmount((100 * 365 * 5) + 1)).toStrictEqual(false)
    })

    test('Validating Meter Number', async () => {
        expect(validateMeterNumber(1)).toStrictEqual(false)
        expect(validateMeterNumber(23)).toStrictEqual(false)
        expect(validateMeterNumber(232)).toStrictEqual(false)
        expect(validateMeterNumber(45454)).toStrictEqual(false)
        expect(validateMeterNumber(343434)).toStrictEqual(true)
        expect(validateMeterNumber(1234565)).toStrictEqual(false)
    })
})

describe("Testing generators", () => {
    test('Generating Token', async () => {
        expect(Number.isNaN(generateToken())).toBe(false)
    })

    test('Get Days Remaining', async () => {
        expect(getDays(200)).toStrictEqual(2)
        expect(getDays(100)).toStrictEqual(1)
        expect(getDays(2000)).toStrictEqual(20)
        
    })
})