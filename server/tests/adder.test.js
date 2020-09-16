const adder = require('../helpers/adder')

test('adds 1 + 2 to equal 3', () => {
    expect(adder(1,2)).toBe(3)
    expect(adder(1,2)).not.toBe(4)
})

test( 'test object assignment', () => {
    const user = { name: 'abdullah'}
    user.gender = 'male'

    expect(user).toEqual({name:'abdullah', gender:'male'})
    expect(user).not.toEqual({name:'dini', gender:'female'})
} )

test('test 1 is true', () => {
    const number1 = 1

    expect(number1).toBeTruthy()
    expect(number1).not.toBeFalsy()
})

test( 'test string regex', () => {
    const sentence = 'belajar di Hacktiv*'

    expect( 'Hactiv8' ).toMatch(/H/)
    expect( 'belajar' ).not.toMatch(/aktif/)
})