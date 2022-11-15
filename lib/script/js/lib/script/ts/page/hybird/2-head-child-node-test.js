import DescriptorFactory from "../../head-child-node-loader/core/descriptor-factory.class.js";
window.addEventListener('load', evt => {
    console.log('head-child-node-loader testing started.');
    demo1();
});
function demo1() {
    const script1 = DescriptorFactory.createDescriptor({
        src: "/page/hybird/2-head-child-node-test/temp/1.js",
        atlast: true,
    });
    const script2 = DescriptorFactory.createDescriptor({
        src: "/page/hybird/2-head-child-node-test/temp/2.js",
        atlast: false,
    });
    const link1 = DescriptorFactory.createDescriptor({
        href: "/page/hybird/2-head-child-node-test/temp/1.css",
        tag: "link",
    });
    console.log(script1, script2, link1);
    [script1, script2, link1].forEach(dr => dr.attachAsync());
}
//# sourceMappingURL=2-head-child-node-test.js.map