const HandlePWChange = require('./passwordCheck')

test('test abcd1234', () => {
    expect(HandlePWChange("abcd1234")).toBe("Password needs to be at least 8 in length, one number, one upper case, one lower case and one special character");
});

test('test Abcd1234!', () => {
    expect(HandlePWChange("Abcd1234!")).toBe("");
});