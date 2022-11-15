import People from "./people.class.js";
function commonFun(s) {
    console.log(`hey, this is a common function, your input is:${s}`);
    const p = new People("guoshi", 88);
    p.introself();
    p.Age = 19;
    console.log('after change age...');
    p.introself();
}
export { commonFun, };
//# sourceMappingURL=fun.js.map