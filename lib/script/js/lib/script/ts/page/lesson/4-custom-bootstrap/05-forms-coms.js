"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/page/lesson/4-custom-bootstrap/05-forms-coms/index.css',
        ],
        [
            '/lib/external-core/custom-bootstrap-5.2.0/js/bootstrap.bundle.js',
            '/lib/script/js/indoor-lib/class/live-set.js',
        ],
        [
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
            '/lib/script/js/indoor-lib/class/observer-wrapper.js',
        ], [
            '/lib/script/js/indoor-lib/class/effect-selector-persist.js',
            '/lib/script/js/indoor-lib/class/flexgrid-item-offset-mender.js',
            '/lib/script/js/indoor-lib/class/dynamic-bootstrap-object-manager.js',
            '/lib/script/js/indoor-lib/class/dynamic-bootstrap-object-toggler-manager.js'
        ]
    ],
    main: () => {
        DynamicBootstrapObjectManager.instance.start();
        DynamicBootstrapObjectTogglerManager.instance.start();
        FlexgridItemOffsetMender.instance.start();
        cloneWithId();
        fixDuplicateIDs();
        configLabelFor();
        openLastDetails();
        startValidating();
        EffectSelectorPersist.getInstance();
        window.scrollTo(0, document.body.clientHeight);
        temp();
        function configLabelFor() {
            const labels = document.querySelectorAll("label");
            labels.forEach(label => {
                if (!label.getAttribute("for")) {
                    const tgt = label.previousElementSibling || label.nextElementSibling;
                    if (tgt) {
                        const id = guidString();
                        tgt.setAttribute("id", id);
                        label.setAttribute("for", id);
                    }
                }
            });
        }
        function startValidating() {
            const forms = document.querySelectorAll('.use-bs-validation');
            Array.from(forms).forEach(fm => {
                const form = fm;
                form.addEventListener('submit', event => {
                    console.log('begin validate...');
                    if (!form.checkValidity()) {
                        console.log('fail to validate, now prevent and stop');
                    }
                    else {
                        console.log('validation is completed.');
                    }
                    form.classList.add('was-validated');
                    event.preventDefault();
                    event.stopPropagation();
                }, false);
            });
        }
        function temp() {
        }
    }
});
//# sourceMappingURL=05-forms-coms.js.map