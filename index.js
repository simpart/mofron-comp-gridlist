/**
 * @file GridList.js
 * @brief grid list component for mofron
 */
const mf     = require('mofron');
const Menu   = require('mofron-comp-menu');
const Click  = require('mofron-event-click');
const Grid   = require('mofron-layout-grid');
const Hrzcnt = require('mofron-layout-hrzcenter');

mf.comp.GridList = class extends mf.Component {
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
    
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addLayout(this.grid());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rate (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_rate) {
                    this.rate(90);
                }
                return this.m_rate;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_rate = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd, idx) {
        try {
            let clk = (p1, p2) => {
                try {
                    let chd = p2.child();
                    for (let cidx in chd) {
                        if (p1.getId() === chd[cidx].child()[0].getId()) {
                            p2.execSelect(parseInt(cidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            chd.execOption({ event : [ new Click(new mf.Param(clk, this)) ] });
            let wrap = new mf.Component({
                child  : [ chd ],
                layout : (0 !== this.rate()) ? [ new Hrzcnt(this.rate()) ] : undefined
            });
            super.addChild(wrap, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIndex (idx) {
        try {
            if (undefined === idx) {
                /* getter */
                return (undefined === this.m_selidx) ? null : this.m_selidx;
            }
            /* setter */
            if (('number' !== typeof idx) || (undefined === this.child()[idx])) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.child()[idx].eventTgt().getRawDom.click();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    selectEvent (evt, prm) {
        try {
            if (undefined === evt) {
                /* getter */
                return (undefined === this.m_selevt) ? [] : this.m_selevt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_selevt) {
                this.m_selevt = [];
            }
            this.m_selevt.push([evt, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    execSelect (idx) {
        try {
            if (('number' !== typeof idx) || (undefined === this.child()[idx])) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.m_selidx = idx;
            let evt = this.selectEvent();
            for (let eidx in evt) {
                evt[eidx][0](idx, evt[eidx][1], this);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    column (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.grid().rate().length();
            }
            /* setter */
            if (('number' !== typeof prm) || (0 === prm) || (100 < prm)) {
                throw new Error('invalid parameter');
            }
            let rate = [];
            for (let idx=0; idx < prm ;idx++) {
                rate.push(100/prm);
            }
            this.grid().rate(rate);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    grid (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_grid) {
                    this.grid(new Grid());
                }
                return this.m_grid;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Grid')) {
                throw new Error('invalid parameter');
            }
            this.m_grid = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.GridList;
/* end of file */
