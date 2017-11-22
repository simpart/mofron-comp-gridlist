/**
 * @file   mofron-comp-gridmenu/index.js
 * @author simpart
 */
let mf = require('mofron');
/* component */
let Menu = require('mofron-comp-menu');
/* layout */
let Grid = require('mofron-layout-grid');
let HrzCent = require('mofron-layout-hrzcenter');
/* event */
let Click = require('mofron-event-click');

/**
 * @class mofron.comp.GridMenu
 * @brief gridmenu component for mofron
 */
mf.comp.GridList = class extends Menu {
    
    constructor (po) {
        try {
            super();
            this.name('GridList');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize vdom
     * 
     * @param prm : (string) text contents
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addLayout(this.grid());
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    grid (val) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_grid) {
                    this.grid(new Grid([25,25,25,25]));
                }
                return this.m_grid;
            }
            /* setter */
            if (true !== mf.func.isObject(val, 'Grid')) {
                throw new Error('invalid parameter');
            }
            this.m_grid = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            let wrap = new mf.Component({
                addLayout : new HrzCent({
                                rate : 80
                            }),
                addChild : chd
            });
            super.addChild(wrap, idx);
            /* replace click event */
            let clk = wrap.getConfig('event', 'Click');
            if (null !== clk) {
                clk.ignore(true);
                chd.addEvent(new Click(clk.getOption));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mofron.comp.GridList;
