"use strict";
function concatenate(resultConstructor, ...arrays) {
    let totalLength = 0;
    for (let arr of arrays) {
        totalLength += arr.length;
    }
    let result = new resultConstructor(totalLength);
    let offset = 0;
    for (let arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
function isLittleEndian() {
    let arr32 = Uint32Array.of(0x12345678);
    let arr8 = new Uint8Array(arr32.buffer);
    switch ((arr8[0] * 0x1000000) + (arr8[1] * 0x10000) + (arr8[2] * 0x100) + (arr8[3])) {
        case 0x12345678:
            return false;
        case 0x78563412:
            return true;
        default:
            throw new Error('Unknown endianness');
    }
}
function arrayBufferToString(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function stringToArrayBuffer(str) {
    let buf = new ArrayBuffer(str.length * 2);
    let v = new Uint16Array(buf);
    for (let i = 0; i < str.length; i++)
        v[i] = str.charCodeAt(i);
    return buf;
}
//# sourceMappingURL=TypedArrayExtensions.js.map