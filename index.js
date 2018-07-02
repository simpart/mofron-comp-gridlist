/**
 * @file GridList.js
 * @brief grid list component for mofron
 */
let mf = require('mofron');
let Menu = require('mofron-comp-menu');
let Click = require('mofron-event-click');
/* layout */
let Grid = require('mofron-layout-grid');

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
    
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addLayout(new Grid());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    column (prm) {
        try {
            let grid = this.getConfig('layout', 'Grid');
            if (undefined === prm) {
                /* getter */
                return (null === grid.value())? null : grid.value().length;
            }
            /* setter */
            if ( ('number' !== typeof prm) && (1 > prm) ) {
                throw new Error('invalid parameter');
            }
            this.confLeftColumn(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    right (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_right) ? null : this.m_right;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_right = prm;
            this.confLeftColumn();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    confLeftColumn (col) {
        try {
            let set_col = [];
            let grid    = this.getConfig('layout', 'Grid');
            let off     = 0;
            if ((null !== this.column()) && (null !== this.right())) {
                for (let i=0;i < this.column();i++) {
                    set_col.push(((100 - (this.right() * this.column())) / this.column())-0.1);
                    set_col.push(this.right());
                }
                grid.value(set_col);
            } else if (null !== col) {
                for (let i=0;i < col;i++) {
                    set_col.push((100/col));
                }
                grid.value(set_col);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            chd.width('100%');
            super.addChild(
                new mf.Component({
                    addChild : chd
                }),
                idx
            );
            if (null !== this.right()) {
                /* for right padding */
                super.addChild(new mf.Component(), undefined, false);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    child (prm, flg) {
        try {
            if (undefined === prm) {
                /* getter */
                /* workaround */
                let chd = super.child();
                if (true === this.isSelEvent()) {
                    let ret = new Array();
                    for (let cidx in chd) {
                        ret.push(chd[cidx].child()[0]);
                    }
                    return ret;
                } else {
                    return chd;
                }
            }
            super.child(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIdx (idx, evt) {
        try {
            let ret = super.selectIdx(idx, evt);
            if (('number' === typeof ret) && (null !== this.right())) {
                ret = ret / 2;
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSelEvent (prm) {
        try {
            if (undefined === prm) {
                return (undefined === this.m_selevtctl) ? false : this.m_selevtctl;
            }
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_selevtctl = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getClickEvent () {
        try {
            return new Click(
                (tgt, prm) => {
                    try {
                        let chd = prm.child();
                        for (var idx in chd) {
                            if (chd[idx].getId() === tgt.getId()) {
                                prm.selectIdx(parseInt(idx), true);
                                break;
                            }
                        }
                        /* exec callback */
                        let sel_evt = prm.selectEvent();
                        if (null !== sel_evt) {
                            prm.isSelEvent(true);
                            sel_evt[0](prm.selectIdx(), prm, sel_evt[1]);
                            prm.isSelEvent(false);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.GridList;
/* end of file */
