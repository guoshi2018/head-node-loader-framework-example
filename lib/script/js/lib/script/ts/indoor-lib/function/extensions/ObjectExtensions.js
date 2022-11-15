"use strict";
Object.prototype.deepFreeze = function () {
    try {
        Object.freeze(this);
    }
    catch (e) {
        console.warn('常规冻结发生错误:', this, typeof this);
    }
    if ("object" == typeof (this) && null != this) {
        Object.values(this).forEach(v => {
            try {
                if (v != this && typeof (v) == 'object') {
                    v === null || v === void 0 ? void 0 : v.deepFreeze();
                }
            }
            catch (e) {
                console.warn('深度冻结发生错误:', v, typeof (v));
            }
        });
    }
};
Object.prototype.deepClone = function (depth = Number.MAX_SAFE_INTEGER) {
    let obj = this;
    if ("object" == typeof (this) && null != this) {
        if (depth > 0) {
            const entries = Object.entries(this);
            if (entries.length > 0) {
                obj = {};
                entries.forEach(kv => {
                    const key = kv[0];
                    const value = kv[1];
                    try {
                        if (value != this) {
                            obj[key] = value ? value.deepClone(depth - 1) : value;
                        }
                    }
                    catch (e) {
                        console.warn("克隆出现错误,已忽略:", value, typeof value);
                    }
                });
            }
        }
    }
    return obj;
};
Object.prototype.compareTo = function (another, refs, parentName = "root") {
    if (typeof this == 'object' && null != this && Object.entries(this).length > 0) {
        Object.entries(this).forEach(kv => {
            const k = kv[0];
            const v1 = kv[1];
            const v2 = another[k];
            const t1 = typeof v1;
            const t2 = typeof v2;
            if (t1 != 'object' && t2 != 'object') {
                if (v1 != v2) {
                    refs.push({
                        key: `${parentName}.${k}`,
                        self: v1,
                        another: v2,
                    });
                }
            }
            else if (t1 != 'object' || t2 != 'object') {
                refs.push({
                    key: `${parentName}.${k}`,
                    self: v1,
                    another: v2,
                });
            }
            else {
                v1 === null || v1 === void 0 ? void 0 : v1.compareTo(v2, refs, `${parentName}.${k}`);
            }
        });
    }
    else {
        if (this != another) {
            refs.push({
                key: parentName,
                self: this,
                another: another,
            });
        }
    }
};
window.addEventListener('load', evt => {
    console.log('call onload first');
});
//# sourceMappingURL=ObjectExtensions.js.map