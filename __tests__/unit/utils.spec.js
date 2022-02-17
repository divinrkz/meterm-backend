const { validateAmount,
      generateToken,
       getDays,
        validateMeterNumber,
         getEnum,
        SUCCESS_RESPONSE, ERROR_RESPONSE } = require('../../src/utils/common.util');


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


describe("Testing utilities", () => {
    test('Get Enum from Object', async () => {
        expect(getEnum({KEY1: 'KEY1', KEY2: 'KEY2'})).toStrictEqual(['KEY1', 'KEY2'])
    })

    test('Get Success Messasges', async () => {
        expect(SUCCESS_RESPONSE(new Object(), 'success')).toStrictEqual(
            {status: 200, success: true, data: {}, message: 'success'}
        )
        expect(SUCCESS_RESPONSE(new Object(), 'saved', 201)).toStrictEqual(
            {status: 201, success: true, data: {}, message: 'saved'}
        )
    })

    test('Get Error Messsage', async () => {
                expect(ERROR_RESPONSE(new Object())).toStrictEqual(
            {status: 500, success: false, error: {}, message: 'INTERNAL SERVER ERROR'}
        )
        expect(ERROR_RESPONSE(new Object(), 'VALIDATION ERROR', 400)).toStrictEqual(
            {status: 400, success: false, error: {}, message: 'VALIDATION ERROR'}
        )
    })
})